package internal

import (
	"minikube/internal/model"
	"os/exec"
	"strings"
)

func IsReady() model.MinikubeState {
	cmd := exec.Command("minikube", "status")
	_, err := cmd.Output()
	if err != nil {
		if exitError, ok := err.(*exec.ExitError); ok {
			if exitError.ExitCode() == 7 {
				return model.StateStopped
			}
		} else {
			return model.Uninstalled
		}
		return model.StatePreparing
	}
	return model.StateReady
}

func Start() error {
	cmd := exec.Command("minikube", "start")
	_, err := cmd.Output()
	if err != nil {
		return err
	}
	return nil
}

func CheckStatus(folderNames []string) ([]model.Service, error) {
	cmd := exec.Command("kubectl", "get", "pods")
	output, err := cmd.Output()
	if err != nil {
		return nil, err
	}
	stringOuptut := string(output)

	lines := strings.Split(strings.TrimSpace(stringOuptut), "\n")

	if len(lines) > 1 {
		lines = lines[1:]
	} else {
		lines = []string{}
	}

	statusList := make(map[string]string)

	for _, line := range lines {
		fields := strings.Fields(line)
		name := strings.Split(fields[0], "-")[0]
		status := fields[2]
		statusList[name] = status
	}

	var services []model.Service

	for _, folderName := range folderNames {
		serviceStatus := statusList[folderName]
		if serviceStatus == "" {
			serviceStatus = "Unknown"
		}
		services = append(services, model.Service{
			Name:   folderName,
			Status: serviceStatus,
		})
	}

	return services, nil
}

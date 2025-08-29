package backend

import (
	"os/exec"
)

func test() {
	cmd := exec.Command("minikube", "status")
	_, err := cmd.Output()
	println(err)
}

func main() {
	test()
}

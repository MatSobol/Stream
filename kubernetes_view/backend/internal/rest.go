package internal

import (
	"encoding/json"
	"minikube/internal/utility"
	"net/http"
)

func GetServices(w http.ResponseWriter, r *http.Request) {
	foldersName, error := utility.ReadFoldersName()

	if error != nil {
		http.Error(w, error.Error(), 500)
		return
	}

	services, error := CheckStatus(foldersName)

	if error != nil {
		http.Error(w, "can't read status of services", 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(services)
}

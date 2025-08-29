package event

import (
	"fmt"
	"log"
	"minikube/internal"
	"minikube/internal/model"
	"net/http"
	"time"
)

func checkAndStartMinikube(w http.ResponseWriter, ticker *time.Ticker, flusher http.Flusher) bool {
	switch internal.IsReady() {
	case model.StateStopped:
		err := internal.Start()
		if err != nil {
			fmt.Fprintf(w, "event: error\ndata: %s\n\n", err.Error())
			flusher.Flush()
			return true
		}
		return false
	case model.Uninstalled:
		fmt.Fprintf(w, "event: error\ndata: %s\n\n", "minikube not installed")
		flusher.Flush()
		return true
	case model.StatePreparing:
		return false
	case model.StateReady:
		fmt.Fprintf(w, "data: ready\n\n")
		ticker.Stop()
		flusher.Flush()
		return true
	}
	return true
}

func Prepare(w http.ResponseWriter, r *http.Request, flusher http.Flusher) {
	ticker := time.NewTicker(time.Second)

	defer ticker.Stop()

	if checkAndStartMinikube(w, ticker, flusher) {
		return
	}

	for {
		select {
		case <-r.Context().Done():
			log.Println("SSE client disconnected.")
			return
		case <-ticker.C:
			if checkAndStartMinikube(w, ticker, flusher) {
				return
			}
		}
	}
}

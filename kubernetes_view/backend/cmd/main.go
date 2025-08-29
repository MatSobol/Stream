package main

import (
	"fmt"
	"minikube/internal"
	"minikube/internal/event"
	"minikube/internal/middleware"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/event", func(w http.ResponseWriter, r *http.Request) {
		event.SseHandler(w, r)
	})
	mux.HandleFunc("/services", func(w http.ResponseWriter, r *http.Request) {
		internal.GetServices(w, r)
	})
	handler := middleware.CorsMiddleware(mux)
	fmt.Println("Server started on :4000")
	err := http.ListenAndServe(":4000", handler)
	if err != nil {
		fmt.Println("Error starting server:", err)
	}
}

import { showError } from "../utility";

export const useSse = (toggle: () => void) => {
  if (window.EventSource) {
    const eventSource = new EventSource("http://localhost:4000/event");

    eventSource.onopen = function () {
      console.log("SSE connection opened.");
    };

    eventSource.onmessage = function (event) {
      switch (event.data) {
        case "ready":
          toggle();
          break;
        default:
          console.log("problem with sse");
      }
      console.log("Received SSE message:", event.data);
    };

    eventSource.onerror = function (error) {
      console.error("SSE Error:", error);
      eventSource.close();
    };
  } else {
    console.error("Your browser does not support Server-Sent Events.");
  }
};

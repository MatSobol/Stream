package model

type PodState int

const (
	Pending PodState = iota
	Running
	Succeeded
	Failed
	Unknown
)

var podName = map[PodState]string{
	Pending:   "Pending",
	Running:   "Running",
	Succeeded: "Succeeded",
	Failed:    "Failed",
	Unknown:   "Unknown",
}

func (ss PodState) String() string {
	return podName[ss]
}

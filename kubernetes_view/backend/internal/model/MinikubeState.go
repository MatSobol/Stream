package model

type MinikubeState int

const (
	StateStopped MinikubeState = iota
	StatePreparing
	StateReady
	Uninstalled
)

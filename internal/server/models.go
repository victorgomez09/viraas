package server

import (
	"github.com/docker/docker/api/types/swarm"
	"github.com/victorgomez09/viraas/internal"
)

type Pagination struct {
	Page int
	Size int
}

func (p Pagination) Limit() int {
	return p.Size
}

func (p Pagination) Offset() int {
	zeroIndexPage := p.Page - 1
	if zeroIndexPage < 0 {
		zeroIndexPage = 0
	}
	return zeroIndexPage * p.Size
}

type Sort struct {
	Field     string
	Direction string
}

type StartAppParams struct {
	App     internal.App
	Route   *internal.Route
	Env     internal.EnvMap
	Plugins []internal.Plugin
}

type RuntimeService struct {
	swarm.Service
	AppID string
}

type RuntimeServiceSpec struct {
	App     internal.App
	Plugins []internal.Plugin
	Env     internal.EnvMap
	Route   *internal.Route
}

type DesiredTaskState string

var (
	DesiredTaskStateRunning  DesiredTaskState = "running"
	DesiredTaskStateShutdown DesiredTaskState = "shutdown"
	DesiredTaskStateAccepted DesiredTaskState = "accepted"
)

package zero

import (
	"github.com/docker/docker/api/types/swarm"
	"github.com/victorgomez09/viraas/internal"
	"github.com/victorgomez09/viraas/internal/server"
)

var (
	App                = internal.App{}
	Node               = internal.Node{}
	Log                = internal.Log{}
	Plugin             = internal.Plugin{}
	Route              = internal.Route{}
	EnvMap             = internal.EnvMap{}
	SwarmService       = swarm.Service{}
	SwarmNode          = swarm.Node{}
	SwarmTask          = swarm.Task{}
	SwarmServiceSpec   = swarm.ServiceSpec{}
	AppInstances       = internal.AppInstances{}
	RuntimeServiceSpec = server.RuntimeServiceSpec{}
	RuntimeService     = server.RuntimeService{}
)

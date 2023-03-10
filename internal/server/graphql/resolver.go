package graphql

import (
	"context"
	"sync"

	"github.com/victorgomez09/viraas/internal"
	"github.com/victorgomez09/viraas/internal/server"
	"github.com/victorgomez09/viraas/internal/server/services"
	"github.com/victorgomez09/viraas/internal/server/zero"
	"github.com/victorgomez09/viraas/internal/utils"
)

//go:generate go run github.com/99designs/gqlgen generate

type Resolver struct {
	Version string
	DB      server.DB
	Logger  server.Logger

	AppRepo            server.AppRepo
	PluginRepo         server.PluginRepo
	EnvRepo            server.EnvRepo
	RouteRepo          server.RouteRepo
	RuntimeRepo        server.RuntimeRepo
	RuntimeServiceRepo server.RuntimeServiceRepo
	RuntimeNodeRepo    server.RuntimeNodeRepo
	RuntimeTaskRepo    server.RuntimeTaskRepo
	RuntimeImageRepo   server.RuntimeImageRepo
	LogRepo            server.LogRepo

	AppService     *services.AppService
	PluginService  *services.PluginService
	RuntimeService *services.RuntimeService
}

func (r *Resolver) getApp(ctx context.Context, id string) (*internal.App, error) {
	app, err := utils.InTx(ctx, r.DB.ReadonlyTx, zero.App, func(tx server.Tx) (internal.App, error) {
		return r.AppRepo.GetOne(ctx, tx, server.AppsFilter{
			ID: &id,
		})
	})
	return utils.SafeReturn(&app, nil, err)
}

func (r *Resolver) getNode(ctx context.Context, id string) (*internal.Node, error) {
	node, err := r.RuntimeNodeRepo.GetOne(ctx, server.RuntimeNodesFilter{
		ID: &id,
	})
	return utils.SafeReturn(&node, nil, err)
}

func (r *Resolver) runSubscriptionJob(ctx context.Context, job func(done func() bool)) {
	finished := false
	mu := sync.Mutex{}
	done := func() bool {
		mu.Lock()
		v := finished
		mu.Unlock()
		return v
	}

	go func() {
		<-ctx.Done()
		mu.Lock()
		finished = true
		mu.Unlock()
		r.Logger.V("Web-socket closed")
	}()

	go func() {
		defer func() {
			e := recover()
			if e != nil {
				r.Logger.E("Recovered: %v", e)
			}
		}()

		job(done)
	}()
}

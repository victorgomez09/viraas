package server

import (
	"context"
	"database/sql"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/swarm"
	"github.com/victorgomez09/viraas/internal"
)

type Tx = *sql.Tx

type DB interface {
	Open() error
	ReadonlyTx(ctx context.Context) (Tx, error)
	ReadWriteTx(ctx context.Context) (Tx, error)
}

type Server interface {
	ServeGraphql() error
}

type Logger interface {
	D(format string, args ...any)
	V(format string, args ...any)
	I(format string, args ...any)
	W(format string, args ...any)
	E(format string, args ...any)
}

type AppsFilter struct {
	ID            *string
	Name          *string
	NameContains  *string
	ExcludeHidden *bool
	AutoUpgrade   *bool
	Sort          *Sort
	Pagination    *Pagination
}
type AppRepo interface {
	GetAll(ctx context.Context, tx Tx, filter AppsFilter) ([]internal.App, error)
	GetOne(ctx context.Context, tx Tx, filter AppsFilter) (internal.App, error)
	Create(ctx context.Context, tx Tx, app internal.App) (internal.App, error)
	Update(ctx context.Context, tx Tx, app internal.App) (internal.App, error)
	Delete(ctx context.Context, tx Tx, app internal.App) (internal.App, error)
}

type PluginsFilter struct {
	Name         *internal.PluginName
	NameContains *string
	Enabled      *bool
}
type PluginRepo interface {
	GetAll(ctx context.Context, tx Tx, filter PluginsFilter) ([]internal.Plugin, error)
	GetOne(ctx context.Context, tx Tx, filter PluginsFilter) (internal.Plugin, error)
	GetTraefik(ctx context.Context, tx Tx) (internal.Plugin, error)
	Update(ctx context.Context, tx Tx, app internal.Plugin) (internal.Plugin, error)
}

type EnvFilter struct {
	AppID string
}
type EnvRepo interface {
	Get(ctx context.Context, tx Tx, filter EnvFilter) (internal.EnvMap, error)
	Set(ctx context.Context, tx Tx, appID string, newEnv internal.EnvMap) (internal.EnvMap, error)
}

type RoutesFilter struct {
	AppID *string
}
type RouteRepo interface {
	GetAll(ctx context.Context, tx Tx, filter RoutesFilter) ([]internal.Route, error)
	GetOne(ctx context.Context, tx Tx, filter RoutesFilter) (internal.Route, error)
	Create(ctx context.Context, tx Tx, route internal.Route) (internal.Route, error)
	Update(ctx context.Context, tx Tx, route internal.Route) (internal.Route, error)
	Delete(ctx context.Context, tx Tx, route internal.Route) (internal.Route, error)
}

type RuntimeRepo interface {
	Info(ctx context.Context) (types.Info, error)
	ClusterInfo(ctx context.Context) (*swarm.Swarm, error)
}

type RuntimeServicesFilter struct {
	ID            *string
	AppID         *string
	IncludeStatus bool
}
type RuntimeServiceRepo interface {
	GetAll(ctx context.Context, filter RuntimeServicesFilter) ([]RuntimeService, error)
	GetOne(ctx context.Context, filter RuntimeServicesFilter) (RuntimeService, error)
	Create(ctx context.Context, service RuntimeServiceSpec) error
	Update(ctx context.Context, serviceID string, newService RuntimeServiceSpec) (RuntimeService, error)
	Remove(ctx context.Context, service RuntimeService) (RuntimeService, error)
}

type RuntimeNodesFilter struct {
	ID *string
}
type RuntimeNodeRepo interface {
	GetAll(ctx context.Context, filter RuntimeNodesFilter) ([]internal.Node, error)
	GetOne(ctx context.Context, filter RuntimeNodesFilter) (internal.Node, error)
}

type RuntimeImageRepo interface {
	GetLatestDigest(ctx context.Context, image string) (string, error)
}

type RuntimeTasksFilter struct {
	NodeID    *string
	ServiceID *string
	State     *DesiredTaskState
}
type RuntimeTaskRepo interface {
	GetAll(ctx context.Context, filter RuntimeTasksFilter) ([]internal.AppTask, error)
}

type LogStream interface {
	Close()
	NextLog() (log internal.Log, done bool, err error)
}
type LogsFilter struct {
	ServiceID string
	// Whether or not to keep listening for logs after returning the latests logs
	Follow *bool
	// Either an integer or the string "all" (default), this dictates the initial amount of logs to
	// return
	Tail          *string
	Before        *time.Time
	After         *time.Time
	ExcludeStdout *bool
	ExcludeStderr *bool
}
type LogRepo interface {
	GetLogStream(ctx context.Context, filter LogsFilter) (LogStream, error)
}

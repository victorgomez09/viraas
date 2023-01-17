package graphql

import (
	"errors"
	"strings"

	"github.com/victorgomez09/viraas/internal"
	"github.com/victorgomez09/viraas/internal/server"
)

func validateAppInput(app internal.AppInput) error {
	if app.Name = strings.TrimSpace(app.Name); app.Name == "" {
		return &server.Error{
			Code:    server.EINVALID,
			Message: "App name cannot be empty",
		}
	}
	if app.Image = strings.TrimSpace(app.Image); app.Image == "" {
		return &server.Error{
			Code:    server.EINVALID,
			Message: "App image cannot be empty",
		}
	}
	return nil
}

func validateRouteInput(route *internal.RouteInput) error {
	if route == nil {
		return nil
	}
	if route.Host == nil && route.TraefikRule == nil {
		return errors.New("you must pass either a host or traefik rule")
	}
	return nil
}

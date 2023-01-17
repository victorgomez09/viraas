package http

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/samber/lo"
	"github.com/victorgomez09/viraas/internal"
	"github.com/victorgomez09/viraas/internal/cli"
)

type GraphQLError struct {
	Message string `json:"message"`
}

type GraphQLResponse struct {
	Data   map[string]any `json:"data"`
	Errors []GraphQLError `json:"errors"`
}

type ViraasAPIClient struct {
	baseURL     string
	accessToken string
	client      *http.Client
}

var (
	EmptyGraphQLResponse = GraphQLResponse{}
	EmptyApp             = internal.App{}
)

func DefaultViraasAPIClient() *ViraasAPIClient {
	return &ViraasAPIClient{
		client: http.DefaultClient,
	}
}

func implementation() cli.APIService {
	return DefaultViraasAPIClient()
}

func (c *ViraasAPIClient) post(
	ctx context.Context,
	query string,
	response string,
	variables any,
	key string,
	target any,
) error {
	body, err := json.Marshal(map[string]any{
		"query":     fmt.Sprintf(query, response),
		"variables": variables,
	})
	if err != nil {
		return err
	}

	url := fmt.Sprintf("%s/graphql", c.baseURL)
	if !strings.Contains(url, "://") {
		url = "http://" + url
	}

	req, err := http.NewRequestWithContext(ctx, "POST", url, bytes.NewBuffer(body))
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", c.accessToken))
	req.Header.Set("Content-Type", "application/json")

	res, err := c.client.Do(req)
	if err != nil {
		return err
	}

	resBody := GraphQLResponse{}
	err = json.NewDecoder(res.Body).Decode(&resBody)
	if err != nil {
		return err
	}
	if len(resBody.Errors) > 0 {
		return errors.New(resBody.Errors[0].Message)
	}

	dataStr, err := json.Marshal(resBody.Data[key])
	if err != nil {
		return err
	}

	return json.Unmarshal(dataStr, target)
}

// SetBaseURL implements cli.APIService
func (c *ViraasAPIClient) SetBaseURL(baseURL string) {
	c.baseURL = baseURL
}

// SetBaseURL implements cli.APIService
func (c *ViraasAPIClient) SetAccessToken(accessToken string) {
	c.accessToken = accessToken
}

// Health implements cli.APIService
func (c *ViraasAPIClient) Health(ctx context.Context, gql string) (internal.Health, error) {
	health := internal.Health{}
	err := c.post(
		ctx,
		`query {
			health %s
		}`,
		gql,
		nil,
		"health",
		&health,
	)
	return health, err
}

// CreateApp implements cli.APIService
func (c *ViraasAPIClient) CreateApp(ctx context.Context, app internal.AppInput) error {
	return c.post(
		ctx,
		`mutation ($input: AppInput!) {
			createApp(input: $input) %s
		}`,
		`{ id }`,
		map[string]any{
			"input": app,
		},
		"startApp",
		&internal.App{},
	)
}

// DeleteApp implements cli.APIService
func (c *ViraasAPIClient) DeleteApp(ctx context.Context, appID string) error {
	return c.post(
		ctx,
		`mutation ($id: ID!) {
			deleteApp(id: $id) %s
		}`,
		`{ id }`,
		map[string]any{
			"id": appID,
		},
		"startApp",
		&internal.App{},
	)
}

// EditApp implements cli.APIService
func (c *ViraasAPIClient) EditApp(ctx context.Context, appID string, changes map[string]any, gql string) (internal.App, error) {
	app := internal.App{}
	err := c.post(
		ctx,
		`mutation ($id: ID!, $changes: AppChanges!) {
			editApp(id: $id, changes: $changes) %s
		}`,
		gql,
		map[string]any{
			"id":      appID,
			"changes": changes,
		},
		"editApp",
		&app,
	)
	return app, err
}

// DisablePlugin implements cli.APIService
func (c *ViraasAPIClient) DisablePlugin(ctx context.Context, pluginName string) error {
	return c.post(
		ctx,
		`mutation ($name: PluginName!) {
			disablePlugin(name: $name) %s
		}`,
		`{ name }`,
		map[string]any{
			"name": pluginName,
		},
		"disablePlugin",
		&internal.Plugin{},
	)
}

// EnablePlugin implements cli.APIService
func (c *ViraasAPIClient) EnablePlugin(ctx context.Context, pluginName string, pluginConfig map[string]any) error {
	return c.post(
		ctx,
		`mutation ($name: PluginName!, $config: Map) {
			enablePlugin(name: $name, config: $config) %s
		}`,
		`{ name }`,
		map[string]any{
			"name":   pluginName,
			"config": pluginConfig,
		},
		"enablePlugin",
		&internal.Plugin{},
	)
}

// GetApp implements cli.APIService
func (c *ViraasAPIClient) GetApp(ctx context.Context, appName string, gql string) (internal.App, error) {
	apps, err := c.ListApps(ctx, cli.ListAppsOptions{ShowHidden: lo.ToPtr(true)}, gql)
	if err != nil {
		return EmptyApp, err
	}
	for _, app := range apps {
		if app.Name == appName {
			return app, nil
		}
	}
	return EmptyApp, fmt.Errorf("Could not find app with name '%s'", appName)
}

// ListApps implements cli.APIService
func (c *ViraasAPIClient) ListApps(ctx context.Context, options cli.ListAppsOptions, gql string) ([]internal.App, error) {
	apps := []internal.App{}
	err := c.post(
		ctx,
		`query ($showHidden: Boolean) {
			apps: listApps(showHidden: $showHidden) %s
		}`,
		gql,
		options,
		"apps",
		&apps,
	)
	return apps, err
}

// ListPlugins implements cli.APIService
func (c *ViraasAPIClient) ListPlugins(ctx context.Context, gql string) ([]internal.Plugin, error) {
	plugins := []internal.Plugin{}
	err := c.post(
		ctx,
		`query {
			plugins: listPlugins %s
		}`,
		gql,
		nil,
		"plugins",
		&plugins,
	)
	return plugins, err
}

// RemoveAppRoute implements cli.APIService
func (c *ViraasAPIClient) RemoveAppRoute(ctx context.Context, appID string) error {
	panic("unimplemented")
}

// SetAppEnv implements cli.APIService
func (c *ViraasAPIClient) SetAppEnv(ctx context.Context, appID string, newEnv internal.EnvMap) error {
	return c.post(
		ctx,
		`mutation ($appId: ID!, $newEnv: Map) {
			setAppEnv(appId: $appId, newEnv: $newEnv) %s
		}`,
		``,
		map[string]any{
			"appId":  appID,
			"newEnv": newEnv,
		},
		"setAppEnv",
		&map[string]any{},
	)
}

// SetAppRoute implements cli.APIService
func (c *ViraasAPIClient) SetAppRoute(ctx context.Context, appID string, route internal.RouteInput) error {
	return c.post(
		ctx,
		`mutation ($appId: ID!, $route: RouteInput!) {
			setAppRoute(appId: $appId, route: $route) %s
		}`,
		`{ updatedAt }`,
		map[string]any{
			"appId": appID,
			"route": route,
		},
		"setAppRoute",
		&internal.Plugin{},
	)
}

// StartApp implements cli.APIService
func (c *ViraasAPIClient) StartApp(ctx context.Context, appID string) error {
	return c.post(
		ctx,
		`mutation ($id: ID!) {
			startApp(id: $id) %s
		}`,
		`{ id }`,
		map[string]any{
			"id": appID,
		},
		"startApp",
		&internal.App{},
	)
}

// StopApp implements cli.APIService
func (c *ViraasAPIClient) StopApp(ctx context.Context, appID string) error {
	return c.post(
		ctx,
		`mutation ($id: ID!) {
			stopApp(id: $id) %s
		}`,
		`{ id }`,
		map[string]any{
			"id": appID,
		},
		"stopApp",
		&internal.App{},
	)
}

// RestartApp implements cli.APIService
func (c *ViraasAPIClient) RestartApp(ctx context.Context, appID string) error {
	return c.post(
		ctx,
		`mutation ($id: ID!) {
			restartApp(id: $id) %s
		}`,
		`{ id }`,
		map[string]any{
			"id": appID,
		},
		"restartApp",
		&internal.App{},
	)
}

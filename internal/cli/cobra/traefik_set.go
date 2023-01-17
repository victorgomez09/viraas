package cobra

import (
	"context"

	"github.com/spf13/cobra"
	"github.com/victorgomez09/viraas/internal"
	"github.com/victorgomez09/viraas/internal/cli/flags"
)

var traefikSetCmd = &cobra.Command{
	Use:   "traefik:set",
	Short: "Set routing rules for an app",
	Run: func(cmd *cobra.Command, args []string) {
		appName, deferable := flags.GetAppFlag(cmd)
		defer deferable()
		routing := flags.GetSetTraefikFlags(cmd)

		setRouting(appName, routing)
	},
}

func init() {
	RootCmd.AddCommand(traefikSetCmd)
	flags.UseAppFlag(traefikSetCmd)
	flags.UseSetTraefikFlags(traefikSetCmd)
}

func setRouting(appName string, routing *flags.SetTraefik) {
	ctx := context.Background()
	title.Printf("\nSetting route for %s...\n", appName)

	app, err := api.GetApp(ctx, appName, `{ id name }`)
	checkErr(err)
	err = api.SetAppRoute(ctx, app.ID, internal.RouteInput{
		Host:        routing.Host,
		Path:        routing.Path,
		TraefikRule: routing.Rule,
	})
	checkErr(err)

	done("Routing rule added")
}

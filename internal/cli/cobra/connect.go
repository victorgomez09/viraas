package cobra

import (
	"context"
	"fmt"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"github.com/victorgomez09/viraas/internal/cli/flags"
)

var connectCmd = &cobra.Command{
	Use:     "connect",
	Short:   "Connect to a Viraas Server",
	Args:    cobra.ExactArgs(1),
	Example: "viraas connect localhost:3000",
	Run: func(cmd *cobra.Command, args []string) {
		baseURL := args[0]
		accessToken := flags.GetAuthFlag(cmd)
		connectToServer(baseURL, accessToken)
	},
}

func init() {
	RootCmd.AddCommand(connectCmd)
	flags.UseAuthFlag(connectCmd)
}

func connectToServer(baseURL string, accessToken string) {
	ctx := context.Background()
	api.SetBaseURL(baseURL)
	viper.Set("host", baseURL)
	if accessToken != "" {
		api.SetAccessToken(accessToken)
		viper.Set("accessToken", accessToken)
	}

	health, err := api.Health(ctx, `{
		version
		dockerVersion
		cluster {
			id
			joinCommand
			createdAt
			updatedAt
		}
	}`)
	checkErr(err)

	title.Println("\nConnected to viraas!")
	fmt.Println(dim("  Viraas Server Version:"), health.Version)
	fmt.Println(dim("  Docker Version:"), health.DockerVersion)
	fmt.Println(dim("  Cluster Enabled?"), health.Cluster != nil)
	if health.Cluster != nil {
		fmt.Println(dim("  Join Command:"), health.Cluster.JoinCommand)
	}
	fmt.Println()

	err = viper.WriteConfig()
	checkErr(err)

	if accessToken != "" {
		warn("Access token is stored un-encrypted in %s", viper.ConfigFileUsed())
	}
	done("Connected to server")
}

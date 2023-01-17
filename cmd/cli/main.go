package main

import (
	"github.com/victorgomez09/viraas/internal/cli"
	"github.com/victorgomez09/viraas/internal/cli/cobra"
	"github.com/victorgomez09/viraas/internal/cli/http"
)

// Compile time variables
var (
	VERSION    string
	BUILD      string
	BUILD_HASH string
	BUILD_DATE string
)

func main() {
	metadata := cli.Metadata{
		Version:   VERSION,
		Build:     BUILD,
		BuildHash: BUILD_HASH,
		BuildDate: BUILD_DATE,
	}
	api := http.DefaultViraasAPIClient()

	cobra.Execute(metadata, api)
}

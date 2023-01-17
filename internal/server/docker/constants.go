package docker

import "regexp"

var dockerEnvKeyRegex = regexp.MustCompile("^[0-9A-Z_]+$")

var (
	viraasIdLabel           = "viraas-id"
	viraasFlagLabel         = "viraas"
	viraasNetworkNamePrefix = "viraas-"
	defaultNetwork          = "default"
)

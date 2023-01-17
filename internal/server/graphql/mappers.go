package graphql

import (
	"github.com/ssoroka/slice"
	"github.com/victorgomez09/viraas/internal"
)

func toBoundVolumes(inputs []internal.BoundVolumeInput) []internal.BoundVolume {
	return slice.Map[internal.BoundVolumeInput, internal.BoundVolume](inputs, toBoundVolume)
}

func toBoundVolume(input internal.BoundVolumeInput) internal.BoundVolume {
	return internal.BoundVolume{
		Target: input.Target,
		Source: input.Source,
	}
}

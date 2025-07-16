---
title: Layer
description: Layer component for Mapbox
---

Learn more about [Layer](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/)

This Layer component adds a visual layer to your Mapbox map, such as circles, lines, fills, or symbols.

## Add Mapbox container

```svelte
<script>
	import * as MapBox from '@napxdd/mapbox-svelte';
	import type { LayerSpecification } from 'mapbox-gl';

	const layerConfig: LayerSpecification = {
		id: 'my-layer',
		source: 'my-source',
		type: 'fill',
		paint: { 'fill-color': '#0080ff', 'fill-opacity': 0.5 }
	};
</script>

<div class="map-container">
	<Mapbox.Container>
		<Mapbox.Layer {layerConfig} />
	</Mapbox.Container>
</div>

<style>
	.map-container {
		width: 100%;
		height: 100vh;
	}
</style>
```

## Add Layer Before Another Layer

You can insert a layer before another existing layer by using the `beforeId` prop:

```svelte
<Mapbox.Layer {layerConfig} beforeId="waterway-label" />
```

## Layer Props

| Prop          | Type               | Required | Description                                                                                    |
| ------------- | ------------------ | -------- | ---------------------------------------------------------------------------------------------- |
| `layerConfig` | LayerSpecification | Yes      | The Mapbox GL JS layer configuration object. Must include at least `id`, `type`, and `source`. |
| `beforeId`    | string             | No       | The ID of an existing layer to insert this layer before.                                       |

## Notes

- The `layerConfig` prop should follow the [Mapbox GL JS layer specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/).
- If used inside a [Group](./Group) component, the layer will automatically register itself for group-based operations.

---
title: Draw
description: Draw component for Mapbox
---

Learn more about [Mapbox Draw](https://github.com/mapbox/mapbox-gl-draw)

This Draw component integrates [@mapbox/mapbox-gl-draw](https://github.com/mapbox/mapbox-gl-draw) with your Mapbox map, allowing users to draw and edit features like polygons directly on the map.

## Add Mapbox container with Draw

```svelte
<script>
	import * as MapBox from '@napxdd/mapbox-svelte';
	import type { MapboxDrawOptions } from '@mapbox/mapbox-gl-draw';

	let mapComponent;

	const drawConfig: MapboxDrawOptions = {
		displayControlsDefault: false,
		controls: {
			polygon: true,
			trash: true
		}
	};
</script>

<div class="map-container">
	<Mapbox.Container bind:this={mapComponent}>
		<Mapbox.Draw {drawConfig} />
	</Mapbox.Container>
</div>

<style>
	.map-container {
		width: 100%;
		height: 100vh;
	}
</style>
```

When you use the `Mapbox.Draw` component, it will add the [Mapbox Draw controls](https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md#controls) to your map. By default, it enables polygon drawing and trash (delete) controls, but you can customize this via the `drawConfig` prop.

## Accessing the Draw Instance

You can access the underlying MapboxDraw instance using the exported `getDrawer` function:

```svelte
<script>
	import * as MapBox from '@napxdd/mapbox-svelte';
	import type { MapboxDrawOptions } from '@mapbox/mapbox-gl-draw';

	let drawComponent: Mapbox.Draw;

	onMount(() => {
		const draw = drawComponent.getDraw();
		draw.changeMode('draw_polygon');
	});
</script>

<div class="map-container">
	<Mapbox.Container>
		<Mapbox.Draw bind:this={drawComponent} />
	</Mapbox.Container>
</div>
```

## Draw Props

| Prop         | Type              | Required | Description                                                                  |
| ------------ | ----------------- | -------- | ---------------------------------------------------------------------------- |
| `drawConfig` | MapboxDrawOptions | No       | Configuration object for MapboxDraw. Controls which drawing tools are shown. |

## Example: Customizing Controls

You can customize which controls are shown by changing the `drawConfig` prop:

```svelte
<Mapbox.Draw
	drawConfig={{
		controls: {
			polygon: true,
			line_string: true,
			point: false,
			trash: true
		}
	}}
/>
```

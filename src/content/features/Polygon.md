---
title: Polygon
description: A custom Group component for grouping Layer and Source
---

Learn more about [Polygon](https://docs.mapbox.com/mapbox-gl-js/example/polygon/)

The `Polygon` component allows you to add a polygon shape to your Mapbox map using GeoJSON coordinates.

## Add Mapbox polygon

```svelte
<script>
	import * as MapBox from '@napxdd/mapbox-svelte';
	import { type Coordinates } from '$lib/mapbox-svelte/mapbox-component/Polygon/type';

	let mapComponent: mapboxgl.Map;

	const polygonCoordinates: Coordinates[] = [
		[
			[-71.224518, 42.213995],
			[-71.224518, 42.223995],
			[-71.214518, 42.223995],
			[-71.214518, 42.213995],
			[-71.224518, 42.213995]
		]
	];
</script>

<div class="map-container">
	<Mapbox.Container bind:this={mapComponent}>
		<Mapbox.Polygon coordinates={polygonCoordinates} source="my-polygon" />
	</Mapbox.Container>
</div>

<style>
	.map-container {
		width: 100%;
		height: 100vh;
	}
</style>
```

When you create a `Mapbox.Polygon`, it will add a GeoJSON source to the map with the provided
coordinates.

## Polygon Props

| Prop          | Type        | Required | Description                                       |
| ------------- | ----------- | -------- | ------------------------------------------------- |
| `coordinates` | Coordinates | Yes      | The coordinates for the polygon (GeoJSON format). |
| `source`      | string      | Yes      | The unique source ID for the polygon data source. |
| `children`    | Node        | No       | Custom content to render inside the polygon.      |

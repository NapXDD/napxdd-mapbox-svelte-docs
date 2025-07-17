---
title: Point
description: A custom Point component for adding markers to Mapbox maps
---

Learn more about [Point](https://docs.mapbox.com/mapbox-gl-js/example/custom-marker/)

The `Point` component allows you to add custom marker points to your Mapbox map using GeoJSON coordinates and custom images.

## Add Mapbox point

```svelte
<script>
	import * as MapBox from '@napxdd/mapbox-svelte';
	import { type Coordinate } from '$lib/mapbox-svelte/mapbox-component/Polygon/type';

	let mapComponent: mapboxgl.Map;

	const pointCoordinates: Coordinate = [-71.224518, 42.213995];
</script>

<div class=map-container">
	<Mapbox.Container >
		<Mapbox.Point
			coordinates={pointCoordinates}
			source="my-source"
            imageSource="https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png"
		/>
	</Mapbox.Container>
</div>

<style>
	.map-container {
		width: 100%;
		height: 100vh;
	}
</style>
```

By default the image source of point will be "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png"

When you create a `Mapbox.Point`, it will add a GeoJSON source to the map with the provided coordinates and load a custom image as a marker.

## Point Props

| Prop          | Type        | Required | Description                                                        |
| ------------- | ----------- | -------- | ------------------------------------------------------------------ |
| `coordinates` | Coordinates | Yes      | The coordinates for the points (GeoJSON format).                   |
| `source`      | string      | Yes      | The unique source ID for the point data source.                    |
| `imageSource` | string      | No       | URL of the custom marker image (defaults to Mapboxscustom marker). |
| `children`    | Node        | No       | Custom content to render inside the point.                         |

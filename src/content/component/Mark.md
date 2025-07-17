---
title: Mark
description: Mark component for Mapbox
---

Learn more about [Mark](https://docs.mapbox.com/mapbox-gl-js/example/add-a-marker/)

This Mark component creates a marker on Mapbox.

## Add Mapbox container

````svelte
<script>
	import * as MapBox from '@napxdd/mapbox-svelte';
	import { type Coordinate } from '$lib/mapbox-svelte/mapbox-component/Polygon/type';

	let mapComponent: mapboxgl.Map;

	const markCoordinate: Coordinate = [-71.224518, 42.213995];
</script>

<div class="map-container">
	<Mapbox.Container bind:this={mapComponent}>
		<Mapbox.Mark coordinate={markCoordinate}></Mapbox.Mark>
	</Mapbox.Container>
</div>

<style>
	.map-container {
		width: 100%;
		height: 100vh;
	}
</style>

When you create a `Mapbox.Mark`, you basically create something like this:

```javascript
new mapboxgl.Marker({ color: 'black' }).setLngLat(coordinates).addTo(map);
````

By default, if you don't add anything to the Marker component, it will be a default Mark with black color.

## Add Children to the Marker

You can add a custom HTML element to the marker:

```svelte
<Mapbox.Container bind:this={mapComponent}>
	<Mapbox.Mark coordinate={markCoordinate}>
		<div>what was that?</div>
	</Mapbox.Mark>
</Mapbox.Container>
```

That means you can add any UI library in the children `Mapbox.Mark` component as you want, or you can also add an image source to the `Mapbox.Mark`:

```svelte
<Mapbox.Container bind:this={mapComponent}>
	<Mapbox.Mark
		backgroundImage="https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png"
		coordinate={markCoordinate}
	/>
</Mapbox.Container>
```

## Mark Props

| Prop              | Type        | Required | Description                                      |
| ----------------- | ----------- | -------- | ------------------------------------------------ |
| `coordinate`      | Coordinate  | Yes      | The longitude and latitude for the marker.       |
| `backgroundImage` | string      | No       | URL for a custom marker image.                   |
| `children`        | HTMLElement | No       | Custom HTML content to render inside the marker. |

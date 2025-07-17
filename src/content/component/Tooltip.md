---
title: Tooltip
description: A custom Tooltip component for displaying hover tooltips on Mapbox layers
---

Learn more about [Popup](https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup)

This Tooltip component creates an interactive tooltip that appears when hovering over a layer in Mapbox. The tooltip can display custom content and automatically positions itself based on the provided coordinates.

## Add Mapbox container

```svelte
<script>
	import * as MapBox from '@napxdd/mapbox-svelte';
	import { type Coordinates } from '$lib/mapbox-svelte/mapbox-component/Polygon/type';

	let mapComponent: mapboxgl.Map;

	// Single point coordinates [longitude, latitude]
	const singlePointCoordinates: Coordinates = [[-71.224518, 42.213995]];

	// Or polygon coordinates for complex shapes
	const polygonCoordinates: Coordinates = [
		[-71.224518, 42.213995],
		[-71.224518, 42.214995],
		[-71.223518, 42.214995],
		[-71.223518, 42.213995],
		[-71.224518, 42.213995]
	];
</script>

<div class="map-container">
	<Mapbox.Container bind:this={mapComponent}>
		<Mapbox.Layer id="my-layer" source="my-source">
			<Mapbox.Polygon coordinates={polygonCoordinates} source="my-source"></Mapbox.Polygon>
			<Mapbox.Tooltip coordinates={polygonCoordinates}>
				<div>This is a tooltip!</div>
			</Mapbox.Tooltip>
		</Mapbox.Layer>
	</Mapbox.Container>
</div>

<style>
	.map-container {
		width: 100%;
		height: 100vh;
	}
</style>
```

When you create a `Mapbox.Tooltip`, you basically create something like this:

```javascript
const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });
popup.setLngLat(center).setDOMContent(divElement).addTo(map);
```

The tooltip automatically calculates the center point from the provided coordinates and displays when the associated layer is hovered.

Basicly it have the same workflow as [Popup](Popup) but using hover instead of click event

## Coordinate Types

The Tooltip component supports two types of coordinates:

### Single Point

For a single point, provide coordinates as a single coordinate pair:

```svelte
<Mapbox.Tooltip coordinates={[[-71.224518, 42.213995]]}>
	<div>Single point tooltip</div>
</Mapbox.Tooltip>
```

### Polygon

For polygons or complex shapes, provide an array of coordinate pairs. The tooltip will automatically calculate the centroid:

```svelte
<Mapbox.Tooltip
	coordinates={[
		[-71.224518, 42.213995],
		[-71.224518, 42.214995],
		[-71.223518, 42.214995],
		[-71.223518, 42.213995],
		[-71.224518, 42.213995]
	]}
>
	<div>Polygon tooltip</div>
</Mapbox.Tooltip>
```

## Add Custom Content

You can add any HTML content to the tooltip:

```svelte
<Mapbox.Tooltip {coordinates}>
	<div class="tooltip-content">
		<h3>Location Information</h3>
		<p>This is a custom tooltip with styled content.</p>
	</div>
</Mapbox.Tooltip>
```

## Tooltip Props

| Prop          | Type        | Required | Description                                            |
| ------------- | ----------- | -------- | ------------------------------------------------------ |
| `coordinates` | Coordinates | Yes      | Array of coordinate pairs for positioning the tooltip. |
| `children`    | Snippet     | No       | Custom HTML content to render inside the tooltip.      |

## How It Works

1. **Coordinate Processing**: The component accepts coordinates and automatically determines if it's a single point or polygon
2. **Centroid Calculation**: For polygons, it uses Turf.js to calculate the centroid for optimal tooltip positioning
3. **Event Binding**: The tooltip is triggered by mouseenter and removed on mouseleave or click on the associated layer
4. **DOM Integration**: The tooltip content is rendered as a child component and injected into the Mapbox popup

## Integration with Layers

The Tooltip component is designed to work within the Mapbox component hierarchy:

```svelte
<Mapbox.Container bind:this={mapComponent}>
	<Mapbox.Layer id="my-layer" source="my-source">
		<Mapbox.Polygon {coordinates} source="my-source" />
		<Mapbox.Tooltip {coordinates}>
			<div>Tooltip content</div>
		</Mapbox.Tooltip>
	</Mapbox.Layer>
</Mapbox.Container>
```

The Tooltip will get the `Layer` context from `Mapbox.Layer`, so make sure it is wrapped under `Mapbox.Layer`.

---
title: Popup
description: A custom Popup component for displaying content on Mapbox maps
---

Learn more about [Popup](https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup)

This Popup component creates an interactive popup that appears when clicking on a layer in Mapbox. The popup can display custom content and automatically positions itself based on the provided coordinates.

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
			<Mapbox.Popup coordinates={polygonCoordinates}>
				<div>This is a popup!</div>
			</Mapbox.Popup>
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

When you create a `Mapbox.Popup`, you basically create something like this:

```javascript
const popup = new mapboxgl.Popup();
popup.setLngLat(center).setDOMContent(divElement).addTo(map);
```

The popup automatically calculates the center point from the provided coordinates and displays when the associated layer is clicked.

## Coordinate Types

The Popup component supports two types of coordinates:

### Single Point

For a single point, provide coordinates as a single coordinate pair:

```svelte
<Mapbox.Popup coordinates={[[-71.224518, 42.213995]]}>
	<div>Single point popup</div>
</Mapbox.Popup>
```

### Polygon

For polygons or complex shapes, provide an array of coordinate pairs. The popup will automatically calculate the centroid:

```svelte
<Mapbox.Popup
	coordinates={[
		[-71.224518, 42.213995],
		[-71.224518, 42.214995],
		[-71.223518, 42.214995],
		[-71.223518, 42.213995],
		[-71.224518, 42.213995]
	]}
>
	<div>Polygon popup</div>
</Mapbox.Popup>
```

## Add Custom Content

You can add any HTML content to the popup:

```svelte
<Mapbox.Popup {coordinates}>
	<div class="popup-content">
		<h3>Location Information</h3>
		<p>This is a custom popup with styled content.</p>
		<button>Click me!</button>
	</div>
</Mapbox.Popup>
```

## Custom onload Handler

Currently, the popup will calculate the middle of the shape to create a popup. If you want to customize this behavior, you can use the `onload` function.

You can provide a custom `onload` function to handle the popup element directly:

```svelte
<Mapbox.Popup
	{coordinates}
	onload={(divElement) => {
		// This divElement returns the children you add to Popup
		console.log('Popup loaded:', divElement);
		// You can modify the popup element here
		map.on('load', () => {
			map.addInteraction('hehe-popup', {
				type: 'click',
				target: { layerId: layer.id },
				handler: (e) => {
					popup.setLngLat(e.lngLat).setDOMContent(divElement).addTo(map);
				}
			});
		});
	}}
>
	<div>Custom popup with onload handler</div>
</Mapbox.Popup>
```

## Popup Props

| Prop          | Type        | Required | Description                                                 |
| ------------- | ----------- | -------- | ----------------------------------------------------------- |
| `coordinates` | Coordinates | Yes      | Array of coordinate pairs for positioning the popup.        |
| `children`    | Snippet     | No       | Custom HTML content to render inside the popup.             |
| `onload`      | Function    | No       | Callback function called when the popup element is created. |

## How It Works

1. **Coordinate Processing**: The component accepts coordinates and automatically determines if it's a single point or polygon
2. **Centroid Calculation**: For polygons, it uses Turf.js to calculate the centroid for optimal popup positioning
3. **Event Binding**: The popup is triggered by a click event on the associated layer
4. **DOM Integration**: The popup content is rendered as a child component and injected into the Mapbox popup

## Integration with Layers

The Popup component is designed to work within the Mapbox component hierarchy:

```svelte
<Mapbox.Container bind:this={mapComponent}>
	<Mapbox.Layer id="my-layer" source="my-source">
		<Mapbox.Polygon {coordinates} source="my-source" />
		<Mapbox.Popup {coordinates}>
			<div>Popup content</div>
		</Mapbox.Popup>
	</Mapbox.Layer>
</Mapbox.Container>
```

The Popup will get the `Layer` context from `Mapbox.Layer`, so make sure it is wrapped under `Mapbox.Layer`.

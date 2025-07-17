---
title: Group
description: A custom Group component for grouping Layer and Source
---

The `Group` component is a utility for organizing multiple `Layer` and `Source` components within a Mapbox map in Svelte. It allows you to logically group related map elements, making it easier to manage complex map structures and apply collective operations or styles.

## Features

- **Logical Grouping:** Bundle multiple `Layer` and `Source` components together for better organization.
- **Hierarchical Structure:** Nest groups to create complex map compositions.
- **Simplified Management:** Apply actions or styles to all children within a group.

## Usage

```svelte
<script>
	import * as Mapbox from '$lib/mapbox-svelte';
	import { type Coordinates } from '$lib/mapbox-svelte';

	const geojsonData = [
		{
			id: 'polygon1',
			coordinates: [
				[-67.13734, 45.13745],
				[-66.96466, 44.8097],
				[-68.03252, 44.3252],
				[-69.06, 43.98],
				[-67.13734, 45.13745]
			],
			properties: {}
		},
		{
			id: 'polygon2',
			coordinates: [
				[-68.5, 44.5],
				[-67.5, 44.5],
				[-67.5, 45.5],
				[-68.5, 45.5],
				[-68.5, 44.5]
			],
			properties: {}
		}
	];

	let groupRefs: Mapbox.Group[] = [];

    $effect(() => {
		groupRefs.forEach((groupRef, i) => {
			if (groupRef) {
				const group = groupRef.getGroup();
				console.log(`Group ${i}:`, group);
			}
		});
	});
</script>

<div class="map-container">
	<Mapbox.Container>
		{#each geojsonData as data, index}
			<Mapbox.Group groupName={`group-${index}`} bind:this={groupRefs[index]}>
				<Mapbox.Layer
					layerConfig={{
						id: data.id,
						source: `source-${data.id}`,
						type: 'fill',
						paint: { 'fill-color': '#0080ff', 'fill-opacity': 0.5 }
					}}
				></Mapbox.Layer>
				<Mapbox.Polygon source={`source-${data.id}`} coordinates={data.coordinates as Coordinates}
				></Mapbox.Polygon>
			</Mapbox.Group>
		{/each}
	</Mapbox.Container>
</div>

<style>
	.map-container {
		width: 100%;
		height: 100vh;
	}
</style>
```

## Props

| Prop      | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| groupName | string | Yes      | A unique identifier for the group. |

## Notes

- The `Group` component does not render any visual element by itself; it is purely for logical organization.
- Children of `Group` should be valid Mapbox components (e.g., `Layer`, `Polygon`).

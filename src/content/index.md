---
title: Get Started
description: Documentation to install mapbox-svelte
---

<div style="padding: 1em; border-left: 4px solid #007acc; margin-bottom: 1.5em; font-weight: bold;">
🚀 Before we begin: This project will always be open source. Feel free to fork it and modify it to your heart's content!
</div>

## Prerequisites

Before you begin, ensure you have:

- Mapbox
- Basic familiarity with Mapbox

> **Note:** If you don't have Mapbox yet, you need to create a Mapbox account and obtain an access token. Follow the official Mapbox installation guide here: [Mapbox Installation](https://docs.mapbox.com/mapbox-gl-js/guides/install/)

## Quick Start

Install the required packages using npm:

```bash
npm install @napxdd/mapbox-svelte
```

## Add mapbox key to your env file

Add the following line to your `.env` file, replacing `your_key` with your actual Mapbox access token:

```bash
PUBLIC_MAPBOX_KEY=your_key
```

## Add Mapbox container

Add the Mapbox container to initialize the map.

```svelte
<script>
	import * as MapBox from '@napxdd/mapbox-svelte';

	let mapComponent: mapboxgl.Map;
</script>

<div class="map-container">
	<Mapbox.Container bind:this={mapComponent}></Mapbox.Container>
</div>

<style>
	.map-container {
		width: 100%;
		height: 100vh;
	}
</style>
```

So when you create a `Mapbox.Container`, it simply initializes Mapbox for you like this:

```svelte
	map = new mapboxgl.Map({
		container: mapContainer,
		center: [longitude, latitude],
		zoom: zoom,
	});
```

Note that we have a bound variable named `mapComponent`. The purpose of this variable is to get a reference to the map instance created in `Mapbox.Container`, so you can freely use it for more customized Mapbox functionality as desired.

```svelte
<script>
	import * as MapBox from '@napxdd/mapbox-svelte';

	let mapComponent: Mapbox.Container;

	$effect(() => {
		const map = mapComponent.getMap();
		console.log(map);
	});
</script>

<div class="map-container">
	<Mapbox.Container bind:this={mapComponent}></Mapbox.Container>
</div>

<style>
	.map-container {
		width: 100%;
		height: 100vh;
	}
</style>
```

For more information about available features, visit the Features section.

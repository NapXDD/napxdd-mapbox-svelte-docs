---
title: Customization Guide
description: Learn how to create a customize Mapbox component
---

I know this libary is still at the start and small, so create your own component will be necesscery for your app and business.

## Add a custom map component

You can initialize a component like this:

```svelte
<script lang="ts">
	import { getMapboxContext, setMapboxContext } from '$lib/mapbox-svelte';
	import type { Snippet } from 'svelte';

	const map: mapboxgl.Map = getMapboxContext();
	setMapboxContext(map);

	let { children }: { children?: Snippet };
</script>

{@render children?.()}
```

> `getMapboxContext()` will get the `map` context from `Mapbox.Container` so make sure to wrap your custom component inside `Mapbox.Container` if using it.

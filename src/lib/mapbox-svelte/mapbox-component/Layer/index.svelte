<script lang="ts">
	import { getContext, onMount, setContext } from 'svelte';
	import type { LayerProps } from './type';
	import type { GroupContext } from '../Group/type';

	let { children, layerConfig, beforeId }: LayerProps = $props();

	const map: mapboxgl.Map = getContext('mapbox-gl');
	setContext('layer', layerConfig);

	const group: GroupContext = getContext('group');
	if (group) {
		group.pushLayer(layerConfig.id);
	}

	onMount(() => {
		map.on('load', () => {
			map.addLayer(layerConfig, beforeId);
		});
	});
</script>

{@render children?.()} 
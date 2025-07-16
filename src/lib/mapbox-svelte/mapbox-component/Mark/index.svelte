<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import { onMount } from 'svelte';
	import type { MarkProps } from './type';
	import { getMapboxContext } from '../utilities';

	let { coordinates = [-71.224518, 42.213995], backgroundImage, children }: MarkProps = $props();

	let divElement: HTMLDivElement;

	const map: mapboxgl.Map = getMapboxContext();

	let marker: mapboxgl.Marker;

	onMount(() => {
		if (!children && !backgroundImage) {
			marker = new mapboxgl.Marker({ color: 'black' }).setLngLat(coordinates).addTo(map);
		} else {
			marker = new mapboxgl.Marker(divElement).setLngLat(coordinates).addTo(map);
		}
	});

	export function getEntity() {
		return marker;
	}
</script>

<div bind:this={divElement}>
	{@render children?.()}
</div> 
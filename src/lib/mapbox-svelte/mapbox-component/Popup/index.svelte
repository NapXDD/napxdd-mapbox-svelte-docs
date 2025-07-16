<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import { getContext, onMount, setContext } from 'svelte';
	import type { PopupProps } from './type';
	import type { LayerSpecification } from 'mapbox-gl';
	import * as turf from '@turf/turf';
	import { getMapboxContext, setMapboxContext } from '../utilities';

	const map: mapboxgl.Map = getMapboxContext();
	setMapboxContext(map);

	const layer: LayerSpecification = getContext('layer');
	setContext('layer', layer);

	let { children, coordinates, onload }: PopupProps = $props();
	let popup = new mapboxgl.Popup();
	let divElement: HTMLDivElement;

	onMount(() => {
		if (!coordinates) throw 'Coordinates not found';
		if (!layer.source) throw 'Source not found';
		if (divElement) {
			let center: [number, number];
			if (
				Array.isArray(coordinates) &&
				coordinates.length === 2 &&
				typeof coordinates[0] === 'number' &&
				typeof coordinates[1] === 'number'
			) {
				// coordinates is a single point [lon, lat]
				center = coordinates as unknown as [number, number];
			} else {
				// coordinates is an array of points (polygon)
				const polygon = turf.polygon([coordinates]);
				const centroid = turf.centroid(polygon);
				center = centroid.geometry.coordinates as [number, number];
			}
			const polygon = turf.polygon([coordinates]);
			const centroid = turf.centroid(polygon);
			center = centroid.geometry.coordinates as [number, number];

			map.on('load', () => {
				if (!onload) {
					map.addInteraction(`${layer.id}-mouseenter-interaction-popup`, {
						type: 'click',
						target: { layerId: layer.id },
						handler: () => {
							popup.setLngLat(center).setDOMContent(divElement).addTo(map);
							const popupElement = popup.getElement();
							if (popupElement) {
								popupElement.style.zIndex = '20';
							}
						}
					});
				} else {
					onload(divElement);
				}
			});
		}
	});
</script>

<div bind:this={divElement}>{@render children?.()}</div> 
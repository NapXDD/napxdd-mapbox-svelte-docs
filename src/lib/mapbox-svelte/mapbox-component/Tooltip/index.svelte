<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import { getContext, onMount, setContext } from 'svelte';
	import type { TooltipProps } from './type';
	import type { LayerSpecification } from 'mapbox-gl';
	import * as turf from '@turf/turf';

	const map: mapboxgl.Map = getContext('mapbox-gl');
	setContext('mapbox-gl', map);

	const layer: LayerSpecification = getContext('layer');
	setContext('layer', layer);

	let { children, coordinates }: TooltipProps = $props();
	let popup = new mapboxgl.Popup({
		closeButton: false,
		closeOnClick: false
	});
	let divElement: HTMLDivElement;

	onMount(() => {
		if (!coordinates) throw 'Coordinates not found';
		if (layer.source && divElement) {
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
			map.on('load', () => {
				map.addInteraction(`${layer.id}-mouseenter-interaction-tooltip-hover`, {
					type: 'mouseenter',
					target: { layerId: layer.id },
					handler: () => {
						const canvas = map.getCanvas?.();
						if (canvas) {
							canvas.style.cursor = 'pointer';
						}
						popup.setLngLat(center).setDOMContent(divElement).addTo(map);
						const popupElement = popup.getElement();
						if (popupElement) {
							popupElement.style.zIndex = '10';
						}
					}
				});

				map.addInteraction(`${layer.id}-mouseenter-interaction-tooltip-leave-hover`, {
					type: 'mouseleave',
					target: { layerId: layer.id },
					handler: () => {
						map.getCanvas().style.cursor = '';
						popup.remove();
					}
				});

				map.addInteraction(`${layer.id}-mouseenter-interaction-tooltip-click`, {
					type: 'click',
					target: { layerId: layer.id },
					handler: () => {
						popup.remove();
					}
				});
			});
		}
	});
</script>

<div bind:this={divElement}>{@render children?.()}</div> 
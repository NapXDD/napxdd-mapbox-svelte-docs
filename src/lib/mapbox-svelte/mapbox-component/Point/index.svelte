<script lang="ts">
	import { getMapboxContext, setMapboxContext } from '../utilities';
	import type { PointProps } from './type';
	import { pointInitialDataSource } from './pointDataSource';
	import type { GroupContext } from '../Group/type';
	import { getContext } from 'svelte';

	let {
		children,
		coordinates = [[-67.13734, 45.13745]],
		source,
		imageSrouce = 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png'
	}: PointProps = $props();

	const group: GroupContext = getContext("group")
	if(group){
		group.pushSource(source)
	}

	const map: mapboxgl.Map = getMapboxContext();
	setMapboxContext(map);
	map.on('load', () => {
		const dataSource = pointInitialDataSource(coordinates);
		map.on('load', () => {
			map.loadImage(imageSrouce, (error, image) => {
				if (error) throw error;
				if (!image) throw 'No image source found';
				map.addImage('custom-marker', image);
				map.addSource(source, dataSource);
			});
		});
	});
</script>

{@render children?.()} 
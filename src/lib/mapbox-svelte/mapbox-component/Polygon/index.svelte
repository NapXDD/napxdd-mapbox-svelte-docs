<script lang="ts">
	import type { PolygonProps } from './type';
	import { polygonInitialDataSource } from './polygonDataSource';
	import { getMapboxContext, setMapboxContext } from '../utilities';
	import { getContext } from 'svelte';
	import type { GroupContext } from '../Group/type';

	let { children, coordinates, source }: PolygonProps = $props();

	const group: GroupContext = getContext("group")

	if(group){
		group.pushSource(source)
	}

	const map: mapboxgl.Map = getMapboxContext();
	setMapboxContext(map);
	map.on('load', () => {
		if (!coordinates) throw 'Coordinates not found';
		const dataSource = polygonInitialDataSource(coordinates);
		map.addSource(source, dataSource);
	});
</script>

{@render children?.()} 
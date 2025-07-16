<script lang="ts">
	import { setContext } from 'svelte';
	import { getMapboxContext, setMapboxContext } from '../utilities';
	import type { GroupProps } from './type';

	let { children, groupName }: GroupProps = $props();

	const map: mapboxgl.Map = getMapboxContext();
	setMapboxContext(map);

	const layers: string[] = [];

	const sources: string[] = []
 
	const getLayer = (id: string) => {
		return map.getLayer(id)
	};

	const pushLayer = (layerName: string) => {
		layers.push(layerName);
	};

	const pushSource = (sourceName: string) => {
		sources.push(sourceName);
	}

	const getSource = (sourceName: string) => {
		return map.getSource(sourceName)
	}

	setContext('group', { groupName, getLayer, pushLayer, layers, pushSource, getSource, sources });

	export function getGroup() {
		return {groupName, getLayer, getSource ,layers, sources};
	}
</script>

{@render children?.()} 
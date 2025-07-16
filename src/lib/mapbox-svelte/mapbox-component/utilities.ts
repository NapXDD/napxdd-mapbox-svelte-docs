import { getContext, setContext } from "svelte";

const mapboxContext = "mapbox-gl";

export function setMapboxContext(map: mapboxgl.Map) {
	setContext(mapboxContext, map);
}

export function getMapboxContext(): mapboxgl.Map {
	return getContext(mapboxContext);
}

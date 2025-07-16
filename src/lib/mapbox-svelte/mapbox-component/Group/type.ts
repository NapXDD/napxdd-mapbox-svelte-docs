import type { Layer, Source } from 'mapbox-gl';
import type { Snippet } from 'svelte';

export interface GroupProps {
	children?: Snippet;
	groupName: string;
}

export interface GroupContext {
	groupName: string;
	getLayer: (layer: string) => Layer | null;
	getSource: (sourceName: string) => Source | null;
	pushLayer: (layer: string) => void;
	pushSource: (sourceName: string) => void;
}

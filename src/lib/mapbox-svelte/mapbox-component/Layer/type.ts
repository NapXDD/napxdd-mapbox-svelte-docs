import type { Snippet } from "svelte";
import type { LayerSpecification } from "mapbox-gl";

export interface LayerProps {
	children?: Snippet;
	layerConfig: LayerSpecification;
	beforeId?: string;
}

import type { Snippet } from "svelte";
import type { Coordinates } from "../Polygon/type";

export interface TooltipProps {
	children?: Snippet;
	coordinates: Coordinates;
}

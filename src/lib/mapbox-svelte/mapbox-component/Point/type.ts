import type { Snippet } from "svelte";
import type { Coordinates } from "../Polygon/type";

export interface PointProps {
	children?: Snippet;
	coordinates: Coordinates;
	source: string;
	imageSrouce?: string;
}

export interface PointConfig {}

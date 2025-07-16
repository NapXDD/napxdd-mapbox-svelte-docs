import type { Snippet } from "svelte";

export type Coordinate = [number, number];

export type Coordinates = Array<Coordinate>;

export interface PolygonProps {
	children?: Snippet;
	coordinates: Coordinates;
	source: string;
}

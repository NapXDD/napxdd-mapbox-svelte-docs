import type { Snippet } from "svelte";
import type { Coordinates } from "../Polygon/type";

export interface PopupProps {
	children?: Snippet;
	coordinates: Coordinates;
	onload?: (divElement: HTMLDivElement) => {};
}

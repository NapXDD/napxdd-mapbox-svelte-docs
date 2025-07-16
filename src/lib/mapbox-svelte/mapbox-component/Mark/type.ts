import type { Snippet } from 'svelte';

export interface MarkProps {
	backgroundImage?: string;
	coordinates?: [number, number];
	tooltip?: string;
	children?: Snippet;
}

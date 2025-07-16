import type { Snippet } from 'svelte';

export interface ContainerProps {
	children?: Snippet;
	initialState?: {
		longitude: number;
		latitude: number;
		zoom: number;
	};
}

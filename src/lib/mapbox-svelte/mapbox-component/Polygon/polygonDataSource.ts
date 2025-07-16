import type { SourceSpecification } from 'mapbox-gl';
import type { Coordinates } from './type';

export const polygonInitialDataSource = (
	coordinate: Coordinates,
	properties?: Record<string, string>
): SourceSpecification => {
	return {
		type: 'geojson',
		data: {
			type: 'Feature',
			geometry: {
				type: 'Polygon',
				// These coordinates outline Maine.
				coordinates: [coordinate]
			},
			properties: properties ? properties : {}
		}
	};
};

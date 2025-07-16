import type { SourceSpecification } from 'mapbox-gl';
import type { Coordinate, Coordinates } from '../Polygon/type';

export const pointInitialDataSource = (coordinates: Coordinates): SourceSpecification => {
	const pointData = coordinates.map((coordinate) => pointGenerate(coordinate));
	return {
		type: 'geojson',
		data: {
			type: 'FeatureCollection',
			features: pointData
		}
	};
};

export const pointGenerate = (
	coordinate: Coordinate,
	properties?: Record<string, string>
): GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties> => {
	return {
		type: 'Feature',
		geometry: {
			type: 'Point',
			// These coordinates outline Maine.
			coordinates: coordinate
		},
		properties: properties ? properties : {}
	};
};

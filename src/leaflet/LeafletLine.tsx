import {LatLng, LatLngExpression, latLng, PolylineOptions} from 'leaflet';
import LeafletPolyline from './LeafletPolyline';

const MEAN_EARTH_RADIUS = 6371000;

/** Computes the end of a segment given the origin, length and azimuth. */
function computeEndLatlng(origin: LatLng, length: number, azimuth: number): LatLng {
  const latOffset = length / MEAN_EARTH_RADIUS * (180 / Math.PI);
  const lngOffset = latOffset / Math.cos(origin.lat * Math.PI / 180);

  return new LatLng(
    origin.lat + latOffset * Math.cos(azimuth),
    origin.lng + lngOffset * Math.sin(azimuth));
}

export interface LeafletLineProps {
  /** Origin point of the line */
  origin: LatLngExpression;
  /** Length of the line to draw in meters. */
  length: number;
  /** Azimith in radians [0, 2*pi). 0 as due north. */
  azimuth: number;
  /** Polyline options. */
  options?: PolylineOptions;
}

export function LeafletLine({origin, length, azimuth, options}: LeafletLineProps) {
  return <LeafletPolyline
    latlngs={[origin, computeEndLatlng(latLng(origin), length, azimuth)]}
    options={options} />;
}

export default LeafletLine;

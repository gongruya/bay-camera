import {LatLngBounds} from 'leaflet';

export interface CloudCoverage {
  lat: number;
  lng: number;
  val: number;
}

export interface HrrrResponse {
  lowCloud?: CloudCoverage[];
  midCloud?: CloudCoverage[];
  highCloud?: CloudCoverage[];
}

export async function fetchHrrr(bounds: LatLngBounds): Promise<HrrrResponse> {
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();
  const response =
    await fetch('http://localhost:8080/?' + new URLSearchParams({
      'minLat': sw.lat.toString(),
      'maxLat': ne.lat.toString(),
      'minLng': sw.lng.toString(),
      'maxLng': ne.lng.toString(),
    }));
  return await response.json() as HrrrResponse;
};

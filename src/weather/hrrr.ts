import {LatLngBounds} from 'leaflet';

/**
* Finds the HRRR forecast range. HRRR normally forecasts 18h but it forecasts
* 48 hours at 00Z, 06Z, 12Z and 18Z.
* https://rapidrefresh.noaa.gov/hrrr/
* https://luckgrib.com/models/hrrr_extended/
* @param date
* @returns hours
*/
export function hrrrRange(date: Date): number {
  const h = date.getUTCHours();
  if (h == 0 || h == 6 || h == 12 || h == 18) {
    return 48;
  }
  return 18;
}

export interface CloudCoverage {
  lat: number;
  lng: number;
  val: number;
}

export interface HrrrResponse {
  cloud?: CloudCoverage[];
}

export type CloudLevel = 'low' | 'mid' | 'high';

export async function fetchHrrrCloud(
  date: Date, forecastHours: number, level: CloudLevel, bounds: LatLngBounds
): Promise<HrrrResponse> {
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();
  const response =
    await fetch('/api/cloud?' + new URLSearchParams({
      'level': level,
      'fcst': forecastHours.toString(),
      'date': date.toISOString(),
      'sw': `${sw.lat},${sw.lng}`,
      'ne': `${ne.lat},${ne.lng}`,
    }));
  return await response.json() as HrrrResponse;
};

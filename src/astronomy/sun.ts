import {LatLngType} from '@/geo/latlng';
import {addDays, compareAsc, isValid} from 'date-fns';
import {getPosition, getTimes} from 'suncalc';

export type SunTime = [Date?, Date?];

export function findSunriseSunsetTimes(start: Date, end: Date, latlng: LatLngType): SunTime[] {
  const inDateRange = (d: Date): boolean => {
    return compareAsc(d, start) >= 0 && compareAsc(d, end) <= 0;
  }

  const s = addDays(start, -1);
  const e = addDays(end, 2);
  const times: SunTime[] = [];

  for (let d = s; compareAsc(d, e) < 0; d = addDays(d, 1)) {
    let {sunrise, sunset} = getTimes(d, latlng.lat, latlng.lng);
    if (!isValid(sunrise) && !isValid(sunset)) {
      continue;
    }
    if (compareAsc(sunset, start) < 0 || compareAsc(sunrise, end) > 0) {
      continue;
    }
    times.push([
      inDateRange(sunrise) ? sunrise : undefined,
      inDateRange(sunset) ? sunset : undefined,
    ]);
  }
  return times;
}

export interface AltAzimuth {
  altitude: number;
  azimuth: number;
}

export function getSunPosition(date: Date, {lat, lng}: LatLngType): AltAzimuth {
  const {altitude, azimuth} = getPosition(date, lat, lng);
  return {
    altitude,
    azimuth: azimuth + Math.PI,
  };
}

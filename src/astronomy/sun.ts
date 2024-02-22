import {LatLngType} from '@/geo/latlng';
import moment from 'moment';
import {getPosition, getTimes} from 'suncalc';

export type SunTime = [Date?, Date?];

export function findSunriseSunsetTimes(start: Date, end: Date, latlng: LatLngType): SunTime[] {
  const inDateRange = (m: moment.Moment): boolean => {
    return m.diff(start) >= 0 && m.diff(end) <= 0;
  }

  const ms = moment(start).subtract(1, 'day');
  const me = moment(end).add(2, 'day');
  const times: SunTime[] = [];

  for (let m = ms; m.diff(me) < 0; m = m.add(1, 'day')) {
    let {sunrise, sunset} = getTimes(m.toDate(), latlng.lat, latlng.lng);
    const mSunrise = moment(sunrise);
    const mSunset = moment(sunset);
    if (!mSunrise.isValid() && !mSunset.isValid()) {
      continue;
    }
    if (mSunset.diff(start) < 0 || mSunrise.diff(end) > 0) {
      continue;
    }
    times.push([
      inDateRange(mSunrise) ? mSunrise.toDate() : undefined,
      inDateRange(mSunset) ? mSunset.toDate() : undefined,
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

import {LatLngType} from '@/geo/latlng';
import moment from 'moment';
import {getTimes} from 'suncalc';

export function findSunriseSunsetTimes(start: Date, end: Date, latlng: LatLngType): [Date?, Date?][] {
  const inDateRange = (m: moment.Moment): boolean => {
    return m.diff(start) >= 0 && m.diff(end) <= 0;
  }

  const ms = moment(start).subtract(1, 'day');
  const me = moment(end).add(2, 'day');
  const times: [Date?, Date?][] = [];

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

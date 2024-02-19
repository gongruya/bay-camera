import {hrrrRange} from '@/weather/hrrr';
import {Slider, Box} from '@mui/material';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {Mark as SliderMark} from '@mui/base/useSlider';
import {findSunriseSunsetTimes} from '@/astronomy/sun';
import {LatLngType} from '@/geo/latlng';

export interface ForecastSliderProps {
  modelDate: Date;
  value: number;
  pinLocation?: LatLngType;
  onChangeCommitted: (value: number) => void;
}

export function ForecastSlider({modelDate, value, pinLocation, onChangeCommitted}: ForecastSliderProps) {
  const [sliderValue, setSliderValue] = useState<number>(0);

  const totalHours = hrrrRange(modelDate);
  const marks: SliderMark[] =
    new Array(totalHours + 1).fill(undefined).map((v, h) => {
      const m = moment(modelDate).add(h, 'hour');
      if (m.hour() === 0) {
        return {value: h, label: m.format('MMM Do')};
      }
      return {value: h};
    });

  if (pinLocation) {
    const sunTimes = findSunriseSunsetTimes(
      modelDate,
      moment(modelDate).add(hrrrRange(modelDate), 'hour').toDate(),
      pinLocation);
    sunTimes.map(([sunrise, sunset]) => {
      if (sunrise) {
        marks.push({
          value: moment(sunrise).diff(modelDate, 'minute') / 60,
          label: '☼↑',
        });
      }
      if (sunset) {
        marks.push({
          value: moment(sunset).diff(modelDate, 'minute') / 60,
          label: '☼↓',
        });
      }
    })
  }

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  return (
    <Slider
      aria-label='Forecast time'
      value={sliderValue}
      valueLabelFormat={(h) => {
        const m = moment(modelDate).add(h, 'hour');
        return <Box sx={{textAlign: 'center'}}>
          <Box>{m.format('MMM Do')}</Box>
          <Box>{m.format('h a')}</Box>
        </Box>;
      }}
      valueLabelDisplay='on'
      step={1}
      marks={marks}
      min={0}
      max={hrrrRange(modelDate)}
      onChange={(e, v) => {
        setSliderValue(v as number);
      }}
      onChangeCommitted={(e, v) => {
        onChangeCommitted(v as number);
      }}
    />
  );
}

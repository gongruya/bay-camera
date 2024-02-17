import {hrrrRange} from '@/weather/hrrr';
import {Slider, Box} from '@mui/material';
import moment from 'moment';
import {useEffect, useState} from 'react';

export interface ForecastSliderProps {
  modelDate: Date;
  value: number;
  onChangeCommitted: (value: number) => void;
}

export function ForecastSlider({modelDate, value, onChangeCommitted}: ForecastSliderProps) {
  const [sliderValue, setSliderValue] = useState<number>(0);

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
      marks
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

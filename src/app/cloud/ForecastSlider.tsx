import {hrrrRange} from '@/weather/hrrr';
import {Slider, Box, Paper, styled} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Mark as SliderMark} from '@mui/base/useSlider';
import {SunTime, findSunriseSunsetTimes} from '@/astronomy/sun';
import {LatLngType} from '@/geo/latlng';
import {deepOrange, yellow} from '@mui/material/colors';
import {addHours, addMinutes, differenceInMinutes, formatDate} from 'date-fns';

interface SunsetSunriseLabelProps {
  position: number;
  children: React.ReactNode;
  onClick: () => void;
}

function SunsetSunriseLabel({position, children, onClick}: SunsetSunriseLabelProps) {
  return (
    <Paper onClick={onClick} sx={{
      position: 'absolute',
      left: `${Math.min(Math.max(position, 0), 1) * 100}%`,
      backgroundColor: yellow[300],
      color: deepOrange[900],
      p: 0.5,
      cursor: 'pointer',
      transform: 'translate(-50%, calc(-100% - 4px))',
    }}>
      {children}
    </Paper>
  );
}

export interface ForecastSliderProps {
  modelDate: Date;
  value: number;
  pinLocation?: LatLngType;
  onChange?: (value: number) => void;
  onChangeCommitted: (value: number) => void;
}

export function ForecastSlider({modelDate, value, pinLocation, onChange, onChangeCommitted}: ForecastSliderProps) {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [sunTimes, setSunTimes] = useState<SunTime[]>([]);

  const totalHours = hrrrRange(modelDate);
  const marks: SliderMark[] =
    new Array(totalHours + 1).fill(undefined).map((_v, h) => ({value: h * 60}));

  useEffect(() => {
    if (pinLocation) {
      setSunTimes(findSunriseSunsetTimes(
        modelDate,
        addHours(modelDate, hrrrRange(modelDate)),
        pinLocation));
    }
  }, [pinLocation]);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  return (
    <Box>
      <Box position='relative'>
        {sunTimes.map(([sunrise]) => {
          if (sunrise) {
            const sunriseMinute = differenceInMinutes(sunrise, modelDate);
            return (
              <SunsetSunriseLabel position={sunriseMinute / (totalHours * 60)}
                key={sunriseMinute} onClick={() => {
                  setSliderValue(sunriseMinute);
                  if (onChange) {
                    onChange(sunriseMinute);
                  }
                  onChangeCommitted(sunriseMinute);
                }}>
                ☼↑
              </SunsetSunriseLabel>
            );
          }
        })}
        {sunTimes.map(([_, sunset]) => {
          if (sunset) {
            const sunsetMinute = differenceInMinutes(sunset, modelDate);
            return (
              <SunsetSunriseLabel position={sunsetMinute / (totalHours * 60)}
                key={sunsetMinute} onClick={() => {
                  setSliderValue(sunsetMinute);
                  if (onChange) {
                    onChange(sunsetMinute);
                  }
                  onChangeCommitted(sunsetMinute);
                }}>
                ☼↓
              </SunsetSunriseLabel>
            );
          }
        })}
      </Box>
      <Slider
        aria-label='Forecast time'
        value={sliderValue}
        valueLabelFormat={(minute) => {
          const date = addMinutes(modelDate, minute);
          return <Box sx={{textAlign: 'center'}}>
            <Box>{formatDate(date, 'MMM d')}</Box>
            <Box>{formatDate(date, 'h:mm aaa')}</Box>
          </Box>;
        }}
        valueLabelDisplay='auto'
        step={60}
        marks={marks}
        min={0}
        max={totalHours * 60}
        onChange={(_e, v) => {
          setSliderValue(v as number);
          if (onChange) {
            onChange(v as number);
          }
        }}
        onChangeCommitted={(_e, v) => {
          onChangeCommitted(v as number);
        }}
      />
    </Box>
  );
}

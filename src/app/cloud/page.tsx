'use client'

import {CloudCoverage, fetchHrrrCloud, hrrrRange} from '@/weather/hrrr';
import {Box, FormControl, InputLabel, MenuItem, Select, Slider} from '@mui/material';
import dynamic from 'next/dynamic';
import {useEffect, useState} from 'react';
import {LatLngBounds} from 'leaflet';
const LeafletMapContainer =
  dynamic(() => import('@/app/cloud/LeafletMapContainer'), {ssr: false});

function hoursAfter(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 3600 * 1000);
}

export default function Home() {
  const [currentDate, setCurrentDate] = useState<Date>();
  const [modelDate, setModelDate] = useState<Date>();
  const [bounds, setBounds] = useState<LatLngBounds>();
  const [forecastHours, setForecastHours] = useState(0);
  const [cloudMap, setCloudMap] = useState<CloudCoverage[]>([]);

  useEffect(() => {
    const date = hoursAfter(new Date(), -1);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
    setModelDate(date);
    setCurrentDate(date);
  }, []);

  useEffect(() => {
    if (modelDate && bounds) {
      fetchHrrrCloud(modelDate, forecastHours, 'low', bounds)
        .then(({lowCloud}) => {
          setCloudMap(lowCloud || []);
        });
    }
  }, [modelDate, forecastHours]);

  return (modelDate && currentDate && <>
    <LeafletMapContainer style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }}
      cloudMap={cloudMap}
      onChange={async (bounds) => {
        setBounds(bounds);
        setCloudMap((await fetchHrrrCloud(
          modelDate, forecastHours, 'low', bounds)).lowCloud || []);
      }}
    />
    <Box sx={{
      zIndex: 9999, position: 'absolute',
      top: 48, right: 48
    }}>
      <FormControl>
        <InputLabel>Model Time</InputLabel>
        <Select variant="filled" value={modelDate.toISOString()}
          label='Model Time'
          onChange={({target: {value}}) => {
            setModelDate(new Date(value));
          }}>
          {[...(new Array(24)).keys()]
            .map((h) => hoursAfter(currentDate, -h))
            .map((d, i) =>
              <MenuItem value={d.toISOString()} key={i}>
                {d.toLocaleString()}
              </MenuItem>
            )}
        </Select>
      </FormControl>
    </Box>
    <Box sx={{
      zIndex: 999, position: 'absolute',
      bottom: 8, left: 40, right: 40,
    }}>
      <Slider
        aria-label='Forecast time'
        defaultValue={forecastHours}
        valueLabelFormat={
          (h) => {
            const d = hoursAfter(modelDate, h);
            return <Box sx={{textAlign: 'center'}}>
              <Box>{d.toLocaleDateString()}</Box>
              <Box>{d.toLocaleTimeString()}</Box>
            </Box>;
          }}
        valueLabelDisplay='on'
        step={1}
        marks
        min={0}
        max={hrrrRange(modelDate)}
        onChangeCommitted={(e, value) => {
          setForecastHours(value as number);
        }}
      />
    </Box>
  </>
  )
};

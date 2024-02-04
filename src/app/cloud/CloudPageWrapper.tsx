'use client'

import moment from 'moment';
import {CloudCoverage, CloudLevel, fetchHrrrCloud, hrrrRange} from '@/weather/hrrr';
import {Box, Button, Drawer, FormControl, IconButton, InputLabel, MenuItem, Select, Slider} from '@mui/material';
import dynamic from 'next/dynamic';
import {useEffect, useState} from 'react';
import {LatLngBounds} from 'leaflet';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

const LeafletMapContainer =
  dynamic(() => import('@/app/cloud/LeafletMapContainer'), {ssr: false});

export function CloudPageWrapper() {
  const [currentDate, setCurrentDate] = useState<Date>();
  const [modelDate, setModelDate] = useState<Date>();
  const [forecastHours, setForecastHours] = useState(0);
  const [bounds, setBounds] = useState<LatLngBounds>();
  const [cloudLevel, setCloudLevel] = useState<CloudLevel>('high');
  const [cloudMap, setCloudMap] = useState<CloudCoverage[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const date = moment().subtract(1, 'hour').startOf('hour').toDate();
    setModelDate(date);
    setCurrentDate(date);
  }, []);

  useEffect(() => {
    if (modelDate && bounds) {
      fetchHrrrCloud(modelDate, forecastHours, cloudLevel, bounds)
        .then(({cloud}) => {
          setCloudMap(cloud || []);
        }).catch(() => {
          console.warn('Cloud forecast is not available at this time yet');
        });
    }
  }, [modelDate, forecastHours, cloudLevel]);

  return (modelDate && currentDate && <>
    <LeafletMapContainer style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
    }}
      cloudMap={cloudMap}
      onChange={async (bounds) => {
        setBounds(bounds);
        setCloudMap((await fetchHrrrCloud(
          modelDate, forecastHours, cloudLevel, bounds)).cloud || []);
      }}
    />
    <Box sx={{position: 'absolute', top: 16, right: 16}}>
      <Button color='primary' variant='contained'
        onClick={() => {
          setDrawerOpen(true);
        }}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor='right' open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}>
        <Box sx={{p: 2}}>
          <IconButton onClick={() => {
            setDrawerOpen(false);
          }}>
            <CloseIcon />
          </IconButton>
          <FormControl fullWidth sx={{my: 2}}>
            <InputLabel>Cloud Level</InputLabel>
            <Select value={cloudLevel}
              label='Model Time'
              onChange={({target: {value}}) => {
                setCloudLevel(value as CloudLevel);
              }}>
              <MenuItem value='high'>High Cloud</MenuItem>
              <MenuItem value='mid'>Medium Cloud</MenuItem>
              <MenuItem value='low'>Low Cloud</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{my: 2}}>
            <InputLabel>Model Time</InputLabel>
            <Select value={modelDate.toISOString()}
              label='Model Time'
              onChange={({target: {value}}) => {
                setModelDate(new Date(value));
              }}>
              {[...(new Array(24)).keys()]
                .map((h) => moment(currentDate).subtract(h, 'hour'))
                .map((m, i) =>
                  <MenuItem value={m.toISOString()} key={i}>
                    {m.format('YYYY-MM-DD hh:mm a')} ({
                      hrrrRange(m.toDate())} hour forecast)
                  </MenuItem>
                )}
            </Select>
          </FormControl>
        </Box>
      </Drawer>
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
        onChangeCommitted={(e, value) => {
          setForecastHours(value as number);
        }}
      />
    </Box>
  </>
  )
};

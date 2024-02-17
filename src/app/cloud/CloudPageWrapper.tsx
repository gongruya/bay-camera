'use client'

import {MapPopupCard} from './MapPopupCard';
import moment from 'moment';
import {CloudCoverage, CloudLevel, fetchHrrrCloud, hrrrRange} from '@/weather/hrrr';
import {Box, Button, CircularProgress, Drawer, FormControl, IconButton, InputLabel, MenuItem, Select, Slider, Snackbar, Typography, styled} from '@mui/material';
import dynamic from 'next/dynamic';
import {useEffect, useState} from 'react';
import {LatLngBounds, LatLngExpression, LatLngLiteral, LatLngTuple} from 'leaflet';
import CloseIcon from '@mui/icons-material/Close';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const LeafletMapContainer =
  dynamic(() => import('@/app/cloud/LeafletMapContainer'), {ssr: false});

const SolidIconButton = styled(IconButton)(({theme}) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.default,
  '&:hover': {
    backgroundColor: theme.palette.background.default,
  },
}));

export function CloudPageWrapper() {
  const [currentDate, setCurrentDate] = useState<Date>();
  const [modelDate, setModelDate] = useState<Date>();
  const [forecastHours, setForecastHours] = useState(2);
  const [forecastHoursSlider, setForecastHoursSlider] = useState(2);
  const [bounds, setBounds] = useState<LatLngBounds>();
  const [cloudLevel, setCloudLevel] = useState<CloudLevel>('high');
  const [cloudMap, setCloudMap] = useState<CloudCoverage[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorFound, setErrorFound] = useState(false);
  const [loading, setLoading] = useState(0);

  const [clickedLocation, setClickedLocation] = useState<LatLngLiteral>();
  const [cloudAmount, setCloudAmount] = useState<number>(0);

  // Center of the map defaulted to San Francisco.
  const [center, setCenter] =
    useState<LatLngExpression>([37.774546, -122.433523]);
  const [gpsCenter, setGpsCenter] = useState<LatLngTuple>();

  useEffect(() => {
    const date = moment().subtract(1, 'hour').startOf('hour').toDate();
    setModelDate(date);
    setCurrentDate(date);

    // Preload the GPS location.
    window.navigator.geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        setGpsCenter([latitude, longitude]);
      })
  }, []);

  useEffect(() => {
    if (modelDate && bounds) {
      setLoading((l) => l + 1);
      fetchHrrrCloud(modelDate, forecastHours, cloudLevel, bounds)
        .then(({cloud}) => {
          setCloudMap(cloud || []);
          setErrorFound(false);
        }).catch(() => {
          setErrorOpen(true);
          setErrorFound(true);
        }).finally(() => {
          setLoading((l) => l - 1);
        });
    }
  }, [modelDate, forecastHours, cloudLevel, bounds]);

  return (modelDate && currentDate && <>
    <Typography variant='h5' color='primary' position='absolute' display='flex'
      sx={{
        pt: 2,
        left: '50%',
        transform: 'translateX(-50%)',
        alignItems: 'center'
      }}>
      {loading > 0 &&
        <Box display='inline-block' position='relative' sx={{width: 32, height: 32}}>
          <CircularProgress size={32} sx={{position: 'absolute', top: 2}} />
          <Box position='absolute'><CloudDownloadIcon sx={{m: 0.5}} /></Box>
        </Box>
      }
      {loading == 0 &&
        <Box display='inline-block' sx={{pl: '4px', width: 32, height: 32}} >
          {!errorFound && <CloudDoneIcon />}
          {errorFound && <CloudOffIcon color='error' />}
        </Box>
      }
      <Typography variant='h5' component='div' display='inline-block'
        sx={{ml: 1}} color={errorFound ? 'error' : 'inherit'}
      >
        bay.camera
      </Typography>
    </Typography>
    <LeafletMapContainer
      center={center}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -1,
      }}
      onMove={(bounds) => {
        setBounds(bounds);
      }}
      onClick={({lat, lng}) => {
        setClickedLocation({lat: lat, lng: lng});
      }}
      popup={<MapPopupCard cloudLevel={cloudLevel}
        cloudAmount={cloudAmount}
        latlng={[clickedLocation?.lat || 0, clickedLocation?.lng || 0]}
        modelDate={modelDate}
        onClick={({date}) => {
          if (date) {
            const h = Math.round(moment(date).diff(modelDate, 'minute') / 60);
            setForecastHours(h);
            setForecastHoursSlider(h);
          }
        }}
      />}
      cloudMap={cloudMap}
      onValueAvailable={(value) => {
        setCloudAmount(value);
      }}
    />

    <Box position='absolute' sx={{right: 16}}>
      <Box my={2}>
        <SolidIconButton onClick={() => {
          setDrawerOpen(true);
        }}>
          <MenuIcon />
        </SolidIconButton>
      </Box>
      <Box my={2}>
        <SolidIconButton disabled={!gpsCenter} onClick={() => {
          // Make a copy so it can be used multiple times.
          setCenter([...gpsCenter!]);
        }}>
          <MyLocationIcon />
        </SolidIconButton>
      </Box>
      <Drawer
        anchor='right' open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}>
        <Box p={2}>
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
          <Box my={2} textAlign='center'>
            <Button variant='outlined' onClick={() => {setDrawerOpen(false);}}>
              Done
            </Button>
          </Box>
          <Box my={2}>
            <IconButton href='https://github.com/gongruya/bay-camera'>
              <GitHubIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </Box>
    <Box sx={{
      zIndex: 999, position: 'absolute',
      bottom: 8, left: 40, right: 40,
    }}>
      <Slider
        aria-label='Forecast time'
        value={forecastHoursSlider}
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
        onChange={(e, value) => {
          setForecastHoursSlider(value as number);
        }}
        onChangeCommitted={(e, value) => {
          setForecastHours(value as number);
        }}
      />
    </Box>
    <Snackbar open={errorOpen} autoHideDuration={2000}
      onClose={() => {setErrorOpen(false);}}
      message='Forecast unavailable at the selected time yet' />
  </>
  )
};

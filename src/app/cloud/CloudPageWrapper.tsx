'use client'

import {MapPopupCard} from './MapPopupCard';
import {ForecastSlider} from './ForecastSlider';
import moment from 'moment';
import {CloudCoverage, CloudLevel, fetchHrrrCloud, hrrrRange} from '@/weather/hrrr';
import {Box, Button, CircularProgress, Drawer, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Snackbar, Typography, styled, useTheme} from '@mui/material';
import {useEffect, useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import GitHubIcon from '@mui/icons-material/GitHub';
import LayersIcon from '@mui/icons-material/Layers';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import {LatLngBoundsType, LatLngType} from '@/geo/latlng';
import {LeafletMapContainer} from '@/app/cloud/LeafletMapContainer';

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
  const [forecastMinutes, setForecastMinutes] = useState(120);
  const [forecastHours, setForecastHours] = useState(2);
  const [bounds, setBounds] = useState<LatLngBoundsType>();
  const [cloudLevel, setCloudLevel] = useState<CloudLevel>('high');
  const [cloudMap, setCloudMap] = useState<CloudCoverage[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorFound, setErrorFound] = useState(false);
  const [loading, setLoading] = useState(0);

  const [pinLocation, setPinLocation] = useState<LatLngType>();
  const [cloudAmount, setCloudAmount] = useState<number>(0);

  // Center of the map defaulted to San Francisco.
  const [center, setCenter] =
    useState<LatLngType>({lat: 37.774546, lng: -122.433523});
  const [gpsCenter, setGpsCenter] = useState<LatLngType>();

  useEffect(() => {
    const date = moment().subtract(1, 'hour').startOf('hour').toDate();
    setModelDate(date);
    setCurrentDate(date);

    // Preload the GPS location.
    window.navigator.geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        setGpsCenter({lat: latitude, lng: longitude});
      })
  }, []);

  useEffect(() => {
    setForecastHours(Math.round(forecastMinutes / 60));
  }, [forecastMinutes]);

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
      border={1} borderTop={0} borderColor='divider' borderRadius='0 0 8px 8px'
      p={1} left='50%' alignItems='center' sx={{
        backgroundColor: 'background.default',
        transform: 'translateX(-50%)',
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
      <Typography variant='h6' component='div' display='inline-block'
        sx={{ml: 0.5}} color={errorFound ? 'error' : 'inherit'}
      >
        @ {moment(modelDate).add(forecastHours, 'hour').format('MM/DD ha')}
      </Typography>
    </Typography >
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
        setBounds({sw: bounds.getSouthWest(), ne: bounds.getNorthEast()});
      }}
      onClick={({lat, lng}) => {
        setPinLocation({lat, lng});
      }}
      popup={<MapPopupCard cloudLevel={cloudLevel}
        cloudAmount={cloudAmount}
        latlng={pinLocation}
        modelDate={modelDate}
        onClick={({date}) => {
          if (date) {
            setForecastMinutes(moment(date).diff(modelDate, 'minute'));
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
          <LayersIcon />
        </SolidIconButton>
      </Box>
      <Box my={2}>
        <SolidIconButton disabled={!gpsCenter} onClick={() => {
          if (gpsCenter) {
            // Make a copy so it can be used multiple times.
            setCenter({...gpsCenter!});
          }
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
    <Box position='absolute' zIndex={999} bottom={8} left={40} right={40}>
      <ForecastSlider value={forecastMinutes} modelDate={modelDate}
        pinLocation={pinLocation}
        onChangeCommitted={(value) => {
          setForecastMinutes(value);
        }} />
    </Box>
    <Snackbar open={errorOpen} autoHideDuration={2000}
      onClose={() => {setErrorOpen(false);}}
      message='Forecast unavailable at the selected time yet' />
  </>
  )
};

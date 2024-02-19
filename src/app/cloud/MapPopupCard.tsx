import React from 'react';
import {CloudLevel, hrrrRange} from '@/weather/hrrr';
import {Box, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Link} from '@mui/material';
import moment from 'moment';
import {findSunriseSunsetTimes} from '@/astronomy/sun';
import {LatLngType} from '@/geo/latlng';

const EM_DASH = '—';

function formatDate(date?: Date, format?: string, invalidPlaceholder: string = EM_DASH): string {
  if (!date) {
    return invalidPlaceholder;
  }
  const m = moment(date);
  if (!m.isValid()) {
    return invalidPlaceholder;
  }
  return m.format(format);
}

export interface MapPopupCardClickData {
  date?: Date;
}

export interface MapPopupCardProps {
  cloudLevel: CloudLevel;
  cloudAmount: number;
  latlng?: LatLngType;
  modelDate: Date;
  onClick?: (data: MapPopupCardClickData) => void;
}

export function MapPopupCard({cloudLevel, cloudAmount, latlng, modelDate, onClick}: MapPopupCardProps) {
  if (!latlng) {
    return <Box minWidth={280}></Box>;
  }

  const times = findSunriseSunsetTimes(
    modelDate,
    moment(modelDate).add(hrrrRange(modelDate), 'hour').toDate(), latlng);
  if (times.length == 0) {
    times.push([]);
  }

  return (
    <Box minWidth={280}>
      <Typography variant='h6' textAlign='center' mb={1}>
        {cloudLevel == 'low' ? 'Low' :
          cloudLevel == 'mid' ? 'Medium' : 'High'}
        &nbsp;Cloud: {cloudAmount}%
      </Typography>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Sunrise</TableCell>
            <TableCell align='center'>Sunset</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {times.map(([sunrise, sunset], i) =>
            <TableRow key={i}>
              <TableCell align='center'>
                {onClick && sunrise ?
                  <Link href='#' onClick={(e) => {
                    onClick && onClick({date: sunrise});
                    e.preventDefault();
                  }}>
                    {formatDate(sunrise, 'MMM D, h:mm a')}
                  </Link> :
                  formatDate(sunrise, 'MMM D, h:mm a')
                }
              </TableCell>
              <TableCell align='center'>
                {onClick && sunset ?
                  <Link href='#' onClick={(e) => {
                    onClick && onClick({date: sunset});
                    e.preventDefault();
                  }}>
                    {formatDate(sunset, 'MMM D, h:mm a')}
                  </Link> :
                  formatDate(sunset, 'MMM D, h:mm a')
                }
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Typography variant='caption' component='div' textAlign='center' mt={2}>
        HRRR@ {moment(modelDate).format('lll Z')}
      </Typography>
    </Box >
  );
}

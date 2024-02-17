import React from 'react';
import {CloudLevel, hrrrRange} from '@/weather/hrrr';
import {Box, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import moment from 'moment';
import {findSunriseSunsetTimes} from '@/astronomy/sun';

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
  latlng: [number, number];
  modelDate: Date;
  onClick?: (data: MapPopupCardClickData) => void;
}

export function MapPopupCard({cloudLevel, cloudAmount, latlng, modelDate, onClick}: MapPopupCardProps) {
  const times = findSunriseSunsetTimes(
    modelDate,
    moment(modelDate).add(hrrrRange(modelDate), 'hour').toDate(), latlng);

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
              <TableCell align='center'
                sx={{cursor: onClick && sunrise ? 'pointer' : 'auto'}}
                onClick={() => {
                  onClick && sunrise && onClick({date: sunrise});
                }}>
                {formatDate(sunrise, 'MMM D, h:mm a')}
              </TableCell>
              <TableCell align='center'
                sx={{cursor: onClick && sunset ? 'pointer' : 'auto'}}
                onClick={() => {
                  onClick && sunset && onClick({date: sunset});
                }}>
                {formatDate(sunset, 'MMM D, h:mm a')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box >
  );
}

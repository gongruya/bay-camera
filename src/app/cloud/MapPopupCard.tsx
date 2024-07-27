import React from 'react';
import {CloudLevel, hrrrRange} from '@/weather/hrrr';
import {Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Link} from '@mui/material';
import {findSunriseSunsetTimes} from '@/astronomy/sun';
import {LatLngType} from '@/geo/latlng';
import {addHours, format, isValid} from 'date-fns';

const EM_DASH = '—';

function formatDate(formatString: string, date?: Date, invalidPlaceholder: string = EM_DASH): string {
  if (!date || !isValid(date)) {
    return invalidPlaceholder;
  }
  return format(date, formatString);
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
    modelDate, addHours(modelDate, hrrrRange(modelDate)), latlng);
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
                    {formatDate('MMM d, h:mm aaa', sunrise)}
                  </Link> :
                  formatDate('MMM d, h:mm aaa', sunrise)
                }
              </TableCell>
              <TableCell align='center'>
                {onClick && sunset ?
                  <Link href='#' onClick={(e) => {
                    onClick && onClick({date: sunset});
                    e.preventDefault();
                  }}>
                    {formatDate('MMM d, h:mm aaa', sunset)}
                  </Link> :
                  formatDate('MMM d, h:mm aaa', sunset)
                }
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Typography variant='caption' component='div' textAlign='center' mt={2}>
        HRRR@ {formatDate('Pp O', modelDate)}
      </Typography>
    </Box >
  );
}

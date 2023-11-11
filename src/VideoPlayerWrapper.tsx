import * as React from 'react';
import Box from '@mui/material/Box';

export default function VideoPlayerWrapper({ children }) {
  return (
    <Box sx={{
      position: 'relative',
      paddingBottom: '56.25%',
      'iframe': {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        border: 0,
      }
    }}>
      {children}
    </Box>
  );
};

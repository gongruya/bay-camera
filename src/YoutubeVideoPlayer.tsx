import * as React from 'react';
import Box from '@mui/material/Box';

export default function YoutubeVideoPlayer({ title, videoId }) {
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
      }
    }}>
      <iframe src={'https://www.youtube-nocookie.com/embed/' + videoId}
        frameBorder="0"
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen>
      </iframe>
    </Box>
  );
};
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div">
            Bay Area Photography Webcams
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
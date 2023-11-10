import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div">
            Bay Area Photography Webcams
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export function Header() {
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography variant='h6' component='div'>
          Bay Area Photography Webcams
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

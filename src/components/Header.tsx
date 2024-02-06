import {Box, List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

export function Header() {
  return (
    <AppBar position='sticky'>
      <Toolbar sx={{display: 'flex'}}>
        <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
          <Image src='/images/logo.png' height={36} width={36} alt='logo'
            style={{display: 'inline'}} />
          <Box component='span' ml={2}>bay.camera</Box>
        </Typography>
        <List sx={{display: 'flex'}}>
          <ListItem disablePadding>
            <ListItemButton href='/cloud'>
              <ListItemText>CLOUD FORECAST</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
};

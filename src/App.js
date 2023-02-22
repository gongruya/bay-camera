import * as React from 'react';

import Header from './Header.tsx'
import YoutubeVideoPlayer from './YoutubeVideoPlayer.tsx';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App(props) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Header />
        <Box sx={{ my: 2 }}>
          <Typography sx={{ my: 1 }} variant="h5" component="h2">
            Satellite image
          </Typography>
          <a href="https://fog.today">
            <img src="https://fog.today/current.jpg" alt="San Francisco fog" style={{ width: '100%' }}></img>
          </a>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography sx={{ my: 1 }} variant="h5" component="h2">
            San Francisco Skyline
          </Typography>
          <YoutubeVideoPlayer title="San Francisco Skyline" videoId="K3vjVPiXq5g" ></YoutubeVideoPlayer>
        </Box>

        {/* <Box sx={{
        flexGrow: 1,
        justifyContent: "center",
        display: "flex",
        mt: 4,
        mb: 2,
      }}>
        <Link href="#">Report issue</Link>
      </Box> */}
      </Container>
    </ThemeProvider>
  );
}

export default App;

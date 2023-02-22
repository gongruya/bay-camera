import * as React from 'react';

import Header from './Header.tsx'
import VideoPlayerWrapper from './VideoPlayerWrapper.tsx';
import YoutubeVideoPlayer from './YoutubeVideoPlayer.tsx';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
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

        <Box sx={{ my: 2 }}>
          <Typography sx={{ my: 1 }} variant="h5" component="h2">
            Salesforce Tower Cameras by CBS Bay Area
          </Typography>
          <VideoPlayerWrapper>
            <iframe frameborder="0" title="Salesforce 1"
              src="https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJtIjoiY2JzIiwidiI6ImM1MDciLCJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsInNoYXJlTGluayI6Imh0dHBzOi8vdzMubXAubHVyYS5saXZlL3BsYXllci9wcm9kL3YzL2FudmxvYWQuaHRtbD9rZXk9ZXlKaGJuWmhZMnNpT2lJMVZrUTJSWGxrTm1ScVpYZGlRMjFPZDBKR2JuTkthakUzV1VGMlIxSjNiQ0lzSW1WNGNHVmpkRkJ5WlhKdmJHd2lPblJ5ZFdVc0ltVjRjR1ZqZEZCeVpYSnZiR3hVYVcxbGIzVjBJam8xTENKb2RHMXNOU0k2ZEhKMVpTd2liU0k2SW1OaWN5SXNJbkJzZFdkcGJuTWlPbnNpWTI5dGMyTnZjbVVpT25zaVl6TWlPaUp6WVc1bWNtRnVZMmx6WTI4dVkySnpiRzlqWVd3dVkyOXRJaXdpWTJ4cFpXNTBTV1FpT2lJek1EQXdNREl6SW4wc0ltUm1jQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbUZrVkdGblZYSnNJam9pYUhSMGNEb3ZMM0IxWW1Ga2N5NW5MbVJ2ZFdKc1pXTnNhV05yTG01bGRDOW5ZVzF3WVdRdllXUnpQM042UFRKNE1seDFNREF5Tm1sMVBTODBNVEk0TDJOaWN5NXpabHgxTURBeU5tTnBkVjl6ZW5OY2RUQXdNalpwYlhCc1BYTmNkVEF3TWpablpHWndYM0psY1QweFhIVXdNREkyWlc1MlBYWndYSFV3TURJMmIzVjBjSFYwUFhodGJGOTJZWE4wTWx4MU1EQXlOblZ1ZG1sbGQyVmtYM0J2YzJsMGFXOXVYM04wWVhKMFBURmNkVEF3TWpaMWNtdzlXM0psWm1WeWNtVnlYM1Z5YkYxY2RUQXdNalprWlhOamNtbHdkR2x2Ymw5MWNtdzlXMlJsYzJOeWFYQjBhVzl1WDNWeWJGMWNkVEF3TWpaamIzSnlaV3hoZEc5eVBWdDBhVzFsYzNSaGJYQmRJaXdpYTJWNVZtRnNkV1Z6SWpwN0ltTmhkR1ZuYjNKcFpYTWlPaUpiVzBOQlZFVkhUMUpKUlZOZFhTSXNJbkJ5YjJkeVlXMGlPaUpiVzFCU1QwZFNRVTFmVGtGTlJWMWRJaXdpYzJsMFpWTmxZM1JwYjI0aU9pSjJhV1JsYnkxbGVIQmxjbWxsYm1ObEluMTlmU3dpYUdWaGNuUmlaV0YwUW1WMFlTSTZleUpoWTJOdmRXNTBJam9pWTJKemJHOWpZV3d0WjJ4dlltRnNMWFZ1YVdacFpXUWlMQ0pqYUdGd2RHVnlWSEpoWTJ0cGJtY2lPbVpoYkhObExDSmpkWE4wYjIxTlpYUmhaR0YwWVNJNmV5SjJhV1JsYnlJNmV5SmpZbk5mYldGeWEyVjBJam9pYzJGdVpuSmhibU5wYzJOdkxtTmljMnh2WTJGc0xtTnZiU0lzSW1OaWMxOXdiR0YwWm05eWJTSTZJbVJsYzJ0MGIzQWlmWDBzSW1OMWMzUnZiVlJ5WVdOcmFXNW5VMlZ5ZG1WeUlqb2lZMkp6WkdsbmFYUmhiRzFsWkdsaExtUXhMbk5qTG05dGRISmtZeTV1WlhRaUxDSmpkWE4wYjIxVWNtRmphMmx1WjFObGNuWmxjbE5sWTNWeVpTSTZJbU5pYzJScFoybDBZV3h0WldScFlTNWtNUzV6WXk1dmJYUnlaR011Ym1WMElpd2lhbTlpU1dRaU9pSnpZMTkyWVNJc0ltMWhjbXRsZEdsdVowTnNiM1ZrU1dRaU9pSTRNak5DUVRBek16VTFOamMwT1RkR04wWXdNREF4TURGQVFXUnZZbVZQY21jaUxDSndTVzV6ZEdGdVkyVWlPaUp3TUNJc0luQnliMlpwYkdVaU9pSmpZbk1pTENKd2RXSnNhWE5vWlhKSlpDSTZJbU5pYzJ4dlkyRnNJaXdpZEhKaFkydHBibWRUWlhKMlpYSWlPaUpqWW5Oa2FXZHBkR0ZzYldWa2FXRXVhR0l1YjIxMGNtUmpMbTVsZENJc0luWmxjbk5wYjI0aU9pSXhMalVpZlN3aWJXOWhkQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbkJoY25SdVpYSkRiMlJsSWpvaVkySnpiRzlqWVd4aGJuWmhkRzkyYVdSbGJ6RTRNVGN6TWpZd09UUXpNU0o5Zlgwc0luUnZhMlZ1SWpvaVpHVm1ZWFZzZENJc0luWWlPaUpqTlRBM0luMCIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4MiZpdT0vNDEyOC9jYnMuc2YmY2l1X3N6cyZpbXBsPXMmZ2RmcF9yZXE9MSZlbnY9dnAmb3V0cHV0PXhtbF92YXN0MiZ1bnZpZXdlZF9wb3NpdGlvbl9zdGFydD0xJnVybD1bcmVmZXJyZXJfdXJsXSZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF0mY29ycmVsYXRvcj1bdGltZXN0YW1wXSIsImtleVZhbHVlcyI6eyJjYXRlZ29yaWVzIjoiW1tDQVRFR09SSUVTXV0iLCJwcm9ncmFtIjoiW1tQUk9HUkFNX05BTUVdXSIsInNpdGVTZWN0aW9uIjoidmlkZW8tZXhwZXJpZW5jZSJ9fX0sImhlYXJ0YmVhdEJldGEiOnsiYWNjb3VudCI6ImNic2xvY2FsLWdsb2JhbC11bmlmaWVkIiwiY2hhcHRlclRyYWNraW5nIjpmYWxzZSwiY3VzdG9tTWV0YWRhdGEiOnsidmlkZW8iOnsiY2JzX21hcmtldCI6InNhbmZyYW5jaXNjby5jYnNsb2NhbC5jb20iLCJjYnNfcGxhdGZvcm0iOiJkZXNrdG9wIn19LCJjdXN0b21UcmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0IiwiY3VzdG9tVHJhY2tpbmdTZXJ2ZXJTZWN1cmUiOiJjYnNkaWdpdGFsbWVkaWEuZDEuc2Mub210cmRjLm5ldCIsImpvYklkIjoic2NfdmEiLCJtYXJrZXRpbmdDbG91ZElkIjoiODIzQkEwMzM1NTY3NDk3RjdGMDAwMTAxQEFkb2JlT3JnIiwicHJvZmlsZSI6ImNicyIsInB1Ymxpc2hlcklkIjoiY2JzbG9jYWwiLCJ0cmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5oYi5vbXRyZGMubmV0IiwidmVyc2lvbiI6IjEuNSJ9LCJtb2F0Ijp7ImNsaWVudFNpZGUiOnsicGFydG5lckNvZGUiOiJjYnNsb2NhbGFudmF0b3ZpZGVvMTgxNzMyNjA5NDMxIn19fSwiaHRtbDUiOnRydWUsInRva2VuIjoiZGVmYXVsdCJ9"></iframe>
          </VideoPlayerWrapper>
          <VideoPlayerWrapper>
            <iframe frameborder="0" title="Salesforce 2"
              src="https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJtIjoiY2JzIiwidiI6ImM1MDgiLCJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsInNoYXJlTGluayI6Imh0dHBzOi8vdzMubXAubHVyYS5saXZlL3BsYXllci9wcm9kL3YzL2FudmxvYWQuaHRtbD9rZXk9ZXlKaGJuWmhZMnNpT2lJMVZrUTJSWGxrTm1ScVpYZGlRMjFPZDBKR2JuTkthakUzV1VGMlIxSjNiQ0lzSW1WNGNHVmpkRkJ5WlhKdmJHd2lPblJ5ZFdVc0ltVjRjR1ZqZEZCeVpYSnZiR3hVYVcxbGIzVjBJam8xTENKb2RHMXNOU0k2ZEhKMVpTd2liU0k2SW1OaWN5SXNJbkJzZFdkcGJuTWlPbnNpWTI5dGMyTnZjbVVpT25zaVl6TWlPaUp6WVc1bWNtRnVZMmx6WTI4dVkySnpiRzlqWVd3dVkyOXRJaXdpWTJ4cFpXNTBTV1FpT2lJek1EQXdNREl6SW4wc0ltUm1jQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbUZrVkdGblZYSnNJam9pYUhSMGNEb3ZMM0IxWW1Ga2N5NW5MbVJ2ZFdKc1pXTnNhV05yTG01bGRDOW5ZVzF3WVdRdllXUnpQM042UFRKNE1seDFNREF5Tm1sMVBTODBNVEk0TDJOaWN5NXpabHgxTURBeU5tTnBkVjl6ZW5OY2RUQXdNalpwYlhCc1BYTmNkVEF3TWpablpHWndYM0psY1QweFhIVXdNREkyWlc1MlBYWndYSFV3TURJMmIzVjBjSFYwUFhodGJGOTJZWE4wTWx4MU1EQXlOblZ1ZG1sbGQyVmtYM0J2YzJsMGFXOXVYM04wWVhKMFBURmNkVEF3TWpaMWNtdzlXM0psWm1WeWNtVnlYM1Z5YkYxY2RUQXdNalprWlhOamNtbHdkR2x2Ymw5MWNtdzlXMlJsYzJOeWFYQjBhVzl1WDNWeWJGMWNkVEF3TWpaamIzSnlaV3hoZEc5eVBWdDBhVzFsYzNSaGJYQmRJaXdpYTJWNVZtRnNkV1Z6SWpwN0ltTmhkR1ZuYjNKcFpYTWlPaUpiVzBOQlZFVkhUMUpKUlZOZFhTSXNJbkJ5YjJkeVlXMGlPaUpiVzFCU1QwZFNRVTFmVGtGTlJWMWRJaXdpYzJsMFpWTmxZM1JwYjI0aU9pSjJhV1JsYnkxbGVIQmxjbWxsYm1ObEluMTlmU3dpYUdWaGNuUmlaV0YwUW1WMFlTSTZleUpoWTJOdmRXNTBJam9pWTJKemJHOWpZV3d0WjJ4dlltRnNMWFZ1YVdacFpXUWlMQ0pqYUdGd2RHVnlWSEpoWTJ0cGJtY2lPbVpoYkhObExDSmpkWE4wYjIxTlpYUmhaR0YwWVNJNmV5SjJhV1JsYnlJNmV5SmpZbk5mYldGeWEyVjBJam9pYzJGdVpuSmhibU5wYzJOdkxtTmljMnh2WTJGc0xtTnZiU0lzSW1OaWMxOXdiR0YwWm05eWJTSTZJbVJsYzJ0MGIzQWlmWDBzSW1OMWMzUnZiVlJ5WVdOcmFXNW5VMlZ5ZG1WeUlqb2lZMkp6WkdsbmFYUmhiRzFsWkdsaExtUXhMbk5qTG05dGRISmtZeTV1WlhRaUxDSmpkWE4wYjIxVWNtRmphMmx1WjFObGNuWmxjbE5sWTNWeVpTSTZJbU5pYzJScFoybDBZV3h0WldScFlTNWtNUzV6WXk1dmJYUnlaR011Ym1WMElpd2lhbTlpU1dRaU9pSnpZMTkyWVNJc0ltMWhjbXRsZEdsdVowTnNiM1ZrU1dRaU9pSTRNak5DUVRBek16VTFOamMwT1RkR04wWXdNREF4TURGQVFXUnZZbVZQY21jaUxDSndTVzV6ZEdGdVkyVWlPaUp3TUNJc0luQnliMlpwYkdVaU9pSmpZbk1pTENKd2RXSnNhWE5vWlhKSlpDSTZJbU5pYzJ4dlkyRnNJaXdpZEhKaFkydHBibWRUWlhKMlpYSWlPaUpqWW5Oa2FXZHBkR0ZzYldWa2FXRXVhR0l1YjIxMGNtUmpMbTVsZENJc0luWmxjbk5wYjI0aU9pSXhMalVpZlN3aWJXOWhkQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbkJoY25SdVpYSkRiMlJsSWpvaVkySnpiRzlqWVd4aGJuWmhkRzkyYVdSbGJ6RTRNVGN6TWpZd09UUXpNU0o5Zlgwc0luUnZhMlZ1SWpvaVpHVm1ZWFZzZENJc0luWWlPaUpqTlRBNEluMCIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4MiZpdT0vNDEyOC9jYnMuc2YmY2l1X3N6cyZpbXBsPXMmZ2RmcF9yZXE9MSZlbnY9dnAmb3V0cHV0PXhtbF92YXN0MiZ1bnZpZXdlZF9wb3NpdGlvbl9zdGFydD0xJnVybD1bcmVmZXJyZXJfdXJsXSZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF0mY29ycmVsYXRvcj1bdGltZXN0YW1wXSIsImtleVZhbHVlcyI6eyJjYXRlZ29yaWVzIjoiW1tDQVRFR09SSUVTXV0iLCJwcm9ncmFtIjoiW1tQUk9HUkFNX05BTUVdXSIsInNpdGVTZWN0aW9uIjoidmlkZW8tZXhwZXJpZW5jZSJ9fX0sImhlYXJ0YmVhdEJldGEiOnsiYWNjb3VudCI6ImNic2xvY2FsLWdsb2JhbC11bmlmaWVkIiwiY2hhcHRlclRyYWNraW5nIjpmYWxzZSwiY3VzdG9tTWV0YWRhdGEiOnsidmlkZW8iOnsiY2JzX21hcmtldCI6InNhbmZyYW5jaXNjby5jYnNsb2NhbC5jb20iLCJjYnNfcGxhdGZvcm0iOiJkZXNrdG9wIn19LCJjdXN0b21UcmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0IiwiY3VzdG9tVHJhY2tpbmdTZXJ2ZXJTZWN1cmUiOiJjYnNkaWdpdGFsbWVkaWEuZDEuc2Mub210cmRjLm5ldCIsImpvYklkIjoic2NfdmEiLCJtYXJrZXRpbmdDbG91ZElkIjoiODIzQkEwMzM1NTY3NDk3RjdGMDAwMTAxQEFkb2JlT3JnIiwicHJvZmlsZSI6ImNicyIsInB1Ymxpc2hlcklkIjoiY2JzbG9jYWwiLCJ0cmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5oYi5vbXRyZGMubmV0IiwidmVyc2lvbiI6IjEuNSJ9LCJtb2F0Ijp7ImNsaWVudFNpZGUiOnsicGFydG5lckNvZGUiOiJjYnNsb2NhbGFudmF0b3ZpZGVvMTgxNzMyNjA5NDMxIn19fSwiaHRtbDUiOnRydWUsInRva2VuIjoiZGVmYXVsdCJ9"></iframe>
          </VideoPlayerWrapper>
          <VideoPlayerWrapper>
            <iframe frameborder="0" title="Salesforce 3"
              src="https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJtIjoiY2JzIiwidiI6ImM1MDkiLCJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsInNoYXJlTGluayI6Imh0dHBzOi8vdzMubXAubHVyYS5saXZlL3BsYXllci9wcm9kL3YzL2FudmxvYWQuaHRtbD9rZXk9ZXlKaGJuWmhZMnNpT2lJMVZrUTJSWGxrTm1ScVpYZGlRMjFPZDBKR2JuTkthakUzV1VGMlIxSjNiQ0lzSW1WNGNHVmpkRkJ5WlhKdmJHd2lPblJ5ZFdVc0ltVjRjR1ZqZEZCeVpYSnZiR3hVYVcxbGIzVjBJam8xTENKb2RHMXNOU0k2ZEhKMVpTd2liU0k2SW1OaWN5SXNJbkJzZFdkcGJuTWlPbnNpWTI5dGMyTnZjbVVpT25zaVl6TWlPaUp6WVc1bWNtRnVZMmx6WTI4dVkySnpiRzlqWVd3dVkyOXRJaXdpWTJ4cFpXNTBTV1FpT2lJek1EQXdNREl6SW4wc0ltUm1jQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbUZrVkdGblZYSnNJam9pYUhSMGNEb3ZMM0IxWW1Ga2N5NW5MbVJ2ZFdKc1pXTnNhV05yTG01bGRDOW5ZVzF3WVdRdllXUnpQM042UFRKNE1seDFNREF5Tm1sMVBTODBNVEk0TDJOaWN5NXpabHgxTURBeU5tTnBkVjl6ZW5OY2RUQXdNalpwYlhCc1BYTmNkVEF3TWpablpHWndYM0psY1QweFhIVXdNREkyWlc1MlBYWndYSFV3TURJMmIzVjBjSFYwUFhodGJGOTJZWE4wTWx4MU1EQXlOblZ1ZG1sbGQyVmtYM0J2YzJsMGFXOXVYM04wWVhKMFBURmNkVEF3TWpaMWNtdzlXM0psWm1WeWNtVnlYM1Z5YkYxY2RUQXdNalprWlhOamNtbHdkR2x2Ymw5MWNtdzlXMlJsYzJOeWFYQjBhVzl1WDNWeWJGMWNkVEF3TWpaamIzSnlaV3hoZEc5eVBWdDBhVzFsYzNSaGJYQmRJaXdpYTJWNVZtRnNkV1Z6SWpwN0ltTmhkR1ZuYjNKcFpYTWlPaUpiVzBOQlZFVkhUMUpKUlZOZFhTSXNJbkJ5YjJkeVlXMGlPaUpiVzFCU1QwZFNRVTFmVGtGTlJWMWRJaXdpYzJsMFpWTmxZM1JwYjI0aU9pSjJhV1JsYnkxbGVIQmxjbWxsYm1ObEluMTlmU3dpYUdWaGNuUmlaV0YwUW1WMFlTSTZleUpoWTJOdmRXNTBJam9pWTJKemJHOWpZV3d0WjJ4dlltRnNMWFZ1YVdacFpXUWlMQ0pqYUdGd2RHVnlWSEpoWTJ0cGJtY2lPbVpoYkhObExDSmpkWE4wYjIxTlpYUmhaR0YwWVNJNmV5SjJhV1JsYnlJNmV5SmpZbk5mYldGeWEyVjBJam9pYzJGdVpuSmhibU5wYzJOdkxtTmljMnh2WTJGc0xtTnZiU0lzSW1OaWMxOXdiR0YwWm05eWJTSTZJbVJsYzJ0MGIzQWlmWDBzSW1OMWMzUnZiVlJ5WVdOcmFXNW5VMlZ5ZG1WeUlqb2lZMkp6WkdsbmFYUmhiRzFsWkdsaExtUXhMbk5qTG05dGRISmtZeTV1WlhRaUxDSmpkWE4wYjIxVWNtRmphMmx1WjFObGNuWmxjbE5sWTNWeVpTSTZJbU5pYzJScFoybDBZV3h0WldScFlTNWtNUzV6WXk1dmJYUnlaR011Ym1WMElpd2lhbTlpU1dRaU9pSnpZMTkyWVNJc0ltMWhjbXRsZEdsdVowTnNiM1ZrU1dRaU9pSTRNak5DUVRBek16VTFOamMwT1RkR04wWXdNREF4TURGQVFXUnZZbVZQY21jaUxDSndTVzV6ZEdGdVkyVWlPaUp3TUNJc0luQnliMlpwYkdVaU9pSmpZbk1pTENKd2RXSnNhWE5vWlhKSlpDSTZJbU5pYzJ4dlkyRnNJaXdpZEhKaFkydHBibWRUWlhKMlpYSWlPaUpqWW5Oa2FXZHBkR0ZzYldWa2FXRXVhR0l1YjIxMGNtUmpMbTVsZENJc0luWmxjbk5wYjI0aU9pSXhMalVpZlN3aWJXOWhkQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbkJoY25SdVpYSkRiMlJsSWpvaVkySnpiRzlqWVd4aGJuWmhkRzkyYVdSbGJ6RTRNVGN6TWpZd09UUXpNU0o5Zlgwc0luUnZhMlZ1SWpvaVpHVm1ZWFZzZENJc0luWWlPaUpqTlRBNUluMCIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4MiZpdT0vNDEyOC9jYnMuc2YmY2l1X3N6cyZpbXBsPXMmZ2RmcF9yZXE9MSZlbnY9dnAmb3V0cHV0PXhtbF92YXN0MiZ1bnZpZXdlZF9wb3NpdGlvbl9zdGFydD0xJnVybD1bcmVmZXJyZXJfdXJsXSZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF0mY29ycmVsYXRvcj1bdGltZXN0YW1wXSIsImtleVZhbHVlcyI6eyJjYXRlZ29yaWVzIjoiW1tDQVRFR09SSUVTXV0iLCJwcm9ncmFtIjoiW1tQUk9HUkFNX05BTUVdXSIsInNpdGVTZWN0aW9uIjoidmlkZW8tZXhwZXJpZW5jZSJ9fX0sImhlYXJ0YmVhdEJldGEiOnsiYWNjb3VudCI6ImNic2xvY2FsLWdsb2JhbC11bmlmaWVkIiwiY2hhcHRlclRyYWNraW5nIjpmYWxzZSwiY3VzdG9tTWV0YWRhdGEiOnsidmlkZW8iOnsiY2JzX21hcmtldCI6InNhbmZyYW5jaXNjby5jYnNsb2NhbC5jb20iLCJjYnNfcGxhdGZvcm0iOiJkZXNrdG9wIn19LCJjdXN0b21UcmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0IiwiY3VzdG9tVHJhY2tpbmdTZXJ2ZXJTZWN1cmUiOiJjYnNkaWdpdGFsbWVkaWEuZDEuc2Mub210cmRjLm5ldCIsImpvYklkIjoic2NfdmEiLCJtYXJrZXRpbmdDbG91ZElkIjoiODIzQkEwMzM1NTY3NDk3RjdGMDAwMTAxQEFkb2JlT3JnIiwicHJvZmlsZSI6ImNicyIsInB1Ymxpc2hlcklkIjoiY2JzbG9jYWwiLCJ0cmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5oYi5vbXRyZGMubmV0IiwidmVyc2lvbiI6IjEuNSJ9LCJtb2F0Ijp7ImNsaWVudFNpZGUiOnsicGFydG5lckNvZGUiOiJjYnNsb2NhbGFudmF0b3ZpZGVvMTgxNzMyNjA5NDMxIn19fSwiaHRtbDUiOnRydWUsInRva2VuIjoiZGVmYXVsdCJ9"></iframe>
          </VideoPlayerWrapper>
          <VideoPlayerWrapper>
            <iframe frameborder="0" title="Salesforce 4"
              src="https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJtIjoiY2JzIiwidiI6ImM1MTAiLCJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsInNoYXJlTGluayI6Imh0dHBzOi8vdzMubXAubHVyYS5saXZlL3BsYXllci9wcm9kL3YzL2FudmxvYWQuaHRtbD9rZXk9ZXlKaGJuWmhZMnNpT2lJMVZrUTJSWGxrTm1ScVpYZGlRMjFPZDBKR2JuTkthakUzV1VGMlIxSjNiQ0lzSW1WNGNHVmpkRkJ5WlhKdmJHd2lPblJ5ZFdVc0ltVjRjR1ZqZEZCeVpYSnZiR3hVYVcxbGIzVjBJam8xTENKb2RHMXNOU0k2ZEhKMVpTd2liU0k2SW1OaWN5SXNJbkJzZFdkcGJuTWlPbnNpWTI5dGMyTnZjbVVpT25zaVl6TWlPaUp6WVc1bWNtRnVZMmx6WTI4dVkySnpiRzlqWVd3dVkyOXRJaXdpWTJ4cFpXNTBTV1FpT2lJek1EQXdNREl6SW4wc0ltUm1jQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbUZrVkdGblZYSnNJam9pYUhSMGNEb3ZMM0IxWW1Ga2N5NW5MbVJ2ZFdKc1pXTnNhV05yTG01bGRDOW5ZVzF3WVdRdllXUnpQM042UFRKNE1seDFNREF5Tm1sMVBTODBNVEk0TDJOaWN5NXpabHgxTURBeU5tTnBkVjl6ZW5OY2RUQXdNalpwYlhCc1BYTmNkVEF3TWpablpHWndYM0psY1QweFhIVXdNREkyWlc1MlBYWndYSFV3TURJMmIzVjBjSFYwUFhodGJGOTJZWE4wTWx4MU1EQXlOblZ1ZG1sbGQyVmtYM0J2YzJsMGFXOXVYM04wWVhKMFBURmNkVEF3TWpaMWNtdzlXM0psWm1WeWNtVnlYM1Z5YkYxY2RUQXdNalprWlhOamNtbHdkR2x2Ymw5MWNtdzlXMlJsYzJOeWFYQjBhVzl1WDNWeWJGMWNkVEF3TWpaamIzSnlaV3hoZEc5eVBWdDBhVzFsYzNSaGJYQmRJaXdpYTJWNVZtRnNkV1Z6SWpwN0ltTmhkR1ZuYjNKcFpYTWlPaUpiVzBOQlZFVkhUMUpKUlZOZFhTSXNJbkJ5YjJkeVlXMGlPaUpiVzFCU1QwZFNRVTFmVGtGTlJWMWRJaXdpYzJsMFpWTmxZM1JwYjI0aU9pSjJhV1JsYnkxbGVIQmxjbWxsYm1ObEluMTlmU3dpYUdWaGNuUmlaV0YwUW1WMFlTSTZleUpoWTJOdmRXNTBJam9pWTJKemJHOWpZV3d0WjJ4dlltRnNMWFZ1YVdacFpXUWlMQ0pqYUdGd2RHVnlWSEpoWTJ0cGJtY2lPbVpoYkhObExDSmpkWE4wYjIxTlpYUmhaR0YwWVNJNmV5SjJhV1JsYnlJNmV5SmpZbk5mYldGeWEyVjBJam9pYzJGdVpuSmhibU5wYzJOdkxtTmljMnh2WTJGc0xtTnZiU0lzSW1OaWMxOXdiR0YwWm05eWJTSTZJbVJsYzJ0MGIzQWlmWDBzSW1OMWMzUnZiVlJ5WVdOcmFXNW5VMlZ5ZG1WeUlqb2lZMkp6WkdsbmFYUmhiRzFsWkdsaExtUXhMbk5qTG05dGRISmtZeTV1WlhRaUxDSmpkWE4wYjIxVWNtRmphMmx1WjFObGNuWmxjbE5sWTNWeVpTSTZJbU5pYzJScFoybDBZV3h0WldScFlTNWtNUzV6WXk1dmJYUnlaR011Ym1WMElpd2lhbTlpU1dRaU9pSnpZMTkyWVNJc0ltMWhjbXRsZEdsdVowTnNiM1ZrU1dRaU9pSTRNak5DUVRBek16VTFOamMwT1RkR04wWXdNREF4TURGQVFXUnZZbVZQY21jaUxDSndTVzV6ZEdGdVkyVWlPaUp3TUNJc0luQnliMlpwYkdVaU9pSmpZbk1pTENKd2RXSnNhWE5vWlhKSlpDSTZJbU5pYzJ4dlkyRnNJaXdpZEhKaFkydHBibWRUWlhKMlpYSWlPaUpqWW5Oa2FXZHBkR0ZzYldWa2FXRXVhR0l1YjIxMGNtUmpMbTVsZENJc0luWmxjbk5wYjI0aU9pSXhMalVpZlN3aWJXOWhkQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbkJoY25SdVpYSkRiMlJsSWpvaVkySnpiRzlqWVd4aGJuWmhkRzkyYVdSbGJ6RTRNVGN6TWpZd09UUXpNU0o5Zlgwc0luUnZhMlZ1SWpvaVpHVm1ZWFZzZENJc0luWWlPaUpqTlRFd0luMCIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4MiZpdT0vNDEyOC9jYnMuc2YmY2l1X3N6cyZpbXBsPXMmZ2RmcF9yZXE9MSZlbnY9dnAmb3V0cHV0PXhtbF92YXN0MiZ1bnZpZXdlZF9wb3NpdGlvbl9zdGFydD0xJnVybD1bcmVmZXJyZXJfdXJsXSZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF0mY29ycmVsYXRvcj1bdGltZXN0YW1wXSIsImtleVZhbHVlcyI6eyJjYXRlZ29yaWVzIjoiW1tDQVRFR09SSUVTXV0iLCJwcm9ncmFtIjoiW1tQUk9HUkFNX05BTUVdXSIsInNpdGVTZWN0aW9uIjoidmlkZW8tZXhwZXJpZW5jZSJ9fX0sImhlYXJ0YmVhdEJldGEiOnsiYWNjb3VudCI6ImNic2xvY2FsLWdsb2JhbC11bmlmaWVkIiwiY2hhcHRlclRyYWNraW5nIjpmYWxzZSwiY3VzdG9tTWV0YWRhdGEiOnsidmlkZW8iOnsiY2JzX21hcmtldCI6InNhbmZyYW5jaXNjby5jYnNsb2NhbC5jb20iLCJjYnNfcGxhdGZvcm0iOiJkZXNrdG9wIn19LCJjdXN0b21UcmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0IiwiY3VzdG9tVHJhY2tpbmdTZXJ2ZXJTZWN1cmUiOiJjYnNkaWdpdGFsbWVkaWEuZDEuc2Mub210cmRjLm5ldCIsImpvYklkIjoic2NfdmEiLCJtYXJrZXRpbmdDbG91ZElkIjoiODIzQkEwMzM1NTY3NDk3RjdGMDAwMTAxQEFkb2JlT3JnIiwicHJvZmlsZSI6ImNicyIsInB1Ymxpc2hlcklkIjoiY2JzbG9jYWwiLCJ0cmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5oYi5vbXRyZGMubmV0IiwidmVyc2lvbiI6IjEuNSJ9LCJtb2F0Ijp7ImNsaWVudFNpZGUiOnsicGFydG5lckNvZGUiOiJjYnNsb2NhbGFudmF0b3ZpZGVvMTgxNzMyNjA5NDMxIn19fSwiaHRtbDUiOnRydWUsInRva2VuIjoiZGVmYXVsdCJ9"></iframe>
          </VideoPlayerWrapper>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography sx={{ my: 1 }} variant="h5" component="h2">
            Golden Gate Bridge from Tiburon
          </Typography>
          <a href="https://www.sheltons.net/wx/station.html">
            <img src="https://www.sheltons.net/wx/webcam.jpg" alt="Golden Gate Bridge from Tiburon" style={{ width: '100%' }}></img>
          </a>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography sx={{ my: 1 }} variant="h5" component="h2">
            Half Moon Bay
          </Typography>
          <a href="https://www.samschowderhouse.com/about-sams/samcam.html">
            <img src="https://samcam1.samschowderhouse.com:20001/axis-cgi/jpg/image.cgi?resolution=640x480&color=1&clock=1&date=1"
              alt="Half Moon Bay" style={{ width: '100%' }}></img>
          </a>
          <a href="https://www.samschowderhouse.com/about-sams/samcam.html">
            <img src="https://samcam2.samschowderhouse.com:20002/axis-cgi/jpg/image.cgi?resolution=640x480&color=1&clock=1&date=1"
              alt="Half Moon Bay" style={{ width: '100%' }}></img>
          </a>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography sx={{ my: 1 }} variant="h5" component="h2">
            Ocean Beach
          </Typography>
          <a href="https://www.oceanbeach.org/webcam.html">
            <img src="https://www.oceanbeach.org/images/sunset.jpg"
              alt="Ocean Beach" style={{ width: '100%' }}></img>
          </a>
          <a href="https://video-monitoring.com/beachcams/oceanbeach/">
            <img src="https://video-monitoring.com/beachcams/oceanbeach/static/s4latest_.jpg"
              alt="Ocean Beach" style={{ width: '100%' }}></img>
          </a>
        </Box>

        <Box sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
          mt: 4,
          mb: 2,
        }}>
          <Typography variant="caption">
            This site uses&nbsp;<Link href="https://twemoji.twitter.com">Twemoji graphics</Link>&nbsp;licensed under&nbsp;<Link href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</Link>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;

'use client'

import {CroppedImage} from '@/components/CroppedImage';
import {VideoPlayerWrapper} from '@/components/VideoPlayerWrapper';
import {YoutubeVideoPlayer} from '@/components/YoutubeVideoPlayer';
import {Box, Container, CssBaseline, Fab, Link, ThemeProvider, Typography, createTheme, useMediaQuery} from '@mui/material';
import {useMemo} from 'react';
import {Feedback as FeedbackIcon} from '@mui/icons-material';

export default function Home() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <>
      <Box sx={{my: 2}}>
        <Typography sx={{my: 1}} variant='h6' component='h2'>
          Satellite image (NOAA GeoColor)
        </Typography>
        <a href='https://www.star.nesdis.noaa.gov/goes/sector_band.php?sat=G18&sector=psw&band=GEOCOLOR&length=24'>
          <CroppedImage src='https://cdn.star.nesdis.noaa.gov/GOES18/ABI/SECTOR/psw/GEOCOLOR/2400x2400.jpg'
            alt='NOAA PSW GeoColor'
            offsetX={400} offsetY={900} cropWidth={550} cropHeight={550}
            width={800} height={800} style={{width: '100%'}} />
        </a>
      </Box>

      <Box sx={{my: 2}}>
        <Typography sx={{my: 1}} variant='h6' component='h2'>
          Satellite image (fog.today)
        </Typography>
        <a href='https://fog.today'>
          <img src='https://fog.today/current.jpg' alt='San Francisco fog' style={{width: '100%'}}></img>
        </a>
      </Box>

      <Box sx={{my: 2}}>
        <Typography sx={{my: 1}} variant='h6' component='h2'>
          Golden Gate Bridge
        </Typography>
        <VideoPlayerWrapper>
          <iframe
            src='https://g1.ipcamlive.com/player/player.php?alias=5e863c6e0e66d'
            title='Golden Gate Bridge'>
          </iframe>
        </VideoPlayerWrapper>
      </Box>

      <Box sx={{my: 2}}>
        <Typography sx={{my: 1}} variant='h6' component='h2'>
          Pacifica
        </Typography>
        <YoutubeVideoPlayer title='Pacifica Mori Point' videoId='xf0NCn-1rws'></YoutubeVideoPlayer>
        <YoutubeVideoPlayer title='Pacifica Beach' videoId='u2RZn6TKrU4'></YoutubeVideoPlayer>
        <YoutubeVideoPlayer title='Pacifica Pier' videoId='tz1z6pVktw0'></YoutubeVideoPlayer>
      </Box>

      <Box sx={{my: 2}}>
        <Typography sx={{my: 1}} variant='h6' component='h2'>
          Salesforce Tower Cameras by <Link href='https://www.cbsnews.com/sanfrancisco/salesforce-tower-cameras/'>CBS Bay Area</Link>
        </Typography>
        <VideoPlayerWrapper>
          <iframe title='Salesforce 1'
            src='https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJtIjoiY2JzIiwidiI6ImM1MDciLCJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsInNoYXJlTGluayI6Imh0dHBzOi8vdzMubXAubHVyYS5saXZlL3BsYXllci9wcm9kL3YzL2FudmxvYWQuaHRtbD9rZXk9ZXlKaGJuWmhZMnNpT2lJMVZrUTJSWGxrTm1ScVpYZGlRMjFPZDBKR2JuTkthakUzV1VGMlIxSjNiQ0lzSW1WNGNHVmpkRkJ5WlhKdmJHd2lPblJ5ZFdVc0ltVjRjR1ZqZEZCeVpYSnZiR3hVYVcxbGIzVjBJam8xTENKb2RHMXNOU0k2ZEhKMVpTd2liU0k2SW1OaWN5SXNJbkJzZFdkcGJuTWlPbnNpWTI5dGMyTnZjbVVpT25zaVl6TWlPaUp6WVc1bWNtRnVZMmx6WTI4dVkySnpiRzlqWVd3dVkyOXRJaXdpWTJ4cFpXNTBTV1FpT2lJek1EQXdNREl6SW4wc0ltUm1jQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbUZrVkdGblZYSnNJam9pYUhSMGNEb3ZMM0IxWW1Ga2N5NW5MbVJ2ZFdKc1pXTnNhV05yTG01bGRDOW5ZVzF3WVdRdllXUnpQM042UFRKNE1seDFNREF5Tm1sMVBTODBNVEk0TDJOaWN5NXpabHgxTURBeU5tTnBkVjl6ZW5OY2RUQXdNalpwYlhCc1BYTmNkVEF3TWpablpHWndYM0psY1QweFhIVXdNREkyWlc1MlBYWndYSFV3TURJMmIzVjBjSFYwUFhodGJGOTJZWE4wTWx4MU1EQXlOblZ1ZG1sbGQyVmtYM0J2YzJsMGFXOXVYM04wWVhKMFBURmNkVEF3TWpaMWNtdzlXM0psWm1WeWNtVnlYM1Z5YkYxY2RUQXdNalprWlhOamNtbHdkR2x2Ymw5MWNtdzlXMlJsYzJOeWFYQjBhVzl1WDNWeWJGMWNkVEF3TWpaamIzSnlaV3hoZEc5eVBWdDBhVzFsYzNSaGJYQmRJaXdpYTJWNVZtRnNkV1Z6SWpwN0ltTmhkR1ZuYjNKcFpYTWlPaUpiVzBOQlZFVkhUMUpKUlZOZFhTSXNJbkJ5YjJkeVlXMGlPaUpiVzFCU1QwZFNRVTFmVGtGTlJWMWRJaXdpYzJsMFpWTmxZM1JwYjI0aU9pSjJhV1JsYnkxbGVIQmxjbWxsYm1ObEluMTlmU3dpYUdWaGNuUmlaV0YwUW1WMFlTSTZleUpoWTJOdmRXNTBJam9pWTJKemJHOWpZV3d0WjJ4dlltRnNMWFZ1YVdacFpXUWlMQ0pqYUdGd2RHVnlWSEpoWTJ0cGJtY2lPbVpoYkhObExDSmpkWE4wYjIxTlpYUmhaR0YwWVNJNmV5SjJhV1JsYnlJNmV5SmpZbk5mYldGeWEyVjBJam9pYzJGdVpuSmhibU5wYzJOdkxtTmljMnh2WTJGc0xtTnZiU0lzSW1OaWMxOXdiR0YwWm05eWJTSTZJbVJsYzJ0MGIzQWlmWDBzSW1OMWMzUnZiVlJ5WVdOcmFXNW5VMlZ5ZG1WeUlqb2lZMkp6WkdsbmFYUmhiRzFsWkdsaExtUXhMbk5qTG05dGRISmtZeTV1WlhRaUxDSmpkWE4wYjIxVWNtRmphMmx1WjFObGNuWmxjbE5sWTNWeVpTSTZJbU5pYzJScFoybDBZV3h0WldScFlTNWtNUzV6WXk1dmJYUnlaR011Ym1WMElpd2lhbTlpU1dRaU9pSnpZMTkyWVNJc0ltMWhjbXRsZEdsdVowTnNiM1ZrU1dRaU9pSTRNak5DUVRBek16VTFOamMwT1RkR04wWXdNREF4TURGQVFXUnZZbVZQY21jaUxDSndTVzV6ZEdGdVkyVWlPaUp3TUNJc0luQnliMlpwYkdVaU9pSmpZbk1pTENKd2RXSnNhWE5vWlhKSlpDSTZJbU5pYzJ4dlkyRnNJaXdpZEhKaFkydHBibWRUWlhKMlpYSWlPaUpqWW5Oa2FXZHBkR0ZzYldWa2FXRXVhR0l1YjIxMGNtUmpMbTVsZENJc0luWmxjbk5wYjI0aU9pSXhMalVpZlN3aWJXOWhkQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbkJoY25SdVpYSkRiMlJsSWpvaVkySnpiRzlqWVd4aGJuWmhkRzkyYVdSbGJ6RTRNVGN6TWpZd09UUXpNU0o5Zlgwc0luUnZhMlZ1SWpvaVpHVm1ZWFZzZENJc0luWWlPaUpqTlRBM0luMCIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4MiZpdT0vNDEyOC9jYnMuc2YmY2l1X3N6cyZpbXBsPXMmZ2RmcF9yZXE9MSZlbnY9dnAmb3V0cHV0PXhtbF92YXN0MiZ1bnZpZXdlZF9wb3NpdGlvbl9zdGFydD0xJnVybD1bcmVmZXJyZXJfdXJsXSZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF0mY29ycmVsYXRvcj1bdGltZXN0YW1wXSIsImtleVZhbHVlcyI6eyJjYXRlZ29yaWVzIjoiW1tDQVRFR09SSUVTXV0iLCJwcm9ncmFtIjoiW1tQUk9HUkFNX05BTUVdXSIsInNpdGVTZWN0aW9uIjoidmlkZW8tZXhwZXJpZW5jZSJ9fX0sImhlYXJ0YmVhdEJldGEiOnsiYWNjb3VudCI6ImNic2xvY2FsLWdsb2JhbC11bmlmaWVkIiwiY2hhcHRlclRyYWNraW5nIjpmYWxzZSwiY3VzdG9tTWV0YWRhdGEiOnsidmlkZW8iOnsiY2JzX21hcmtldCI6InNhbmZyYW5jaXNjby5jYnNsb2NhbC5jb20iLCJjYnNfcGxhdGZvcm0iOiJkZXNrdG9wIn19LCJjdXN0b21UcmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0IiwiY3VzdG9tVHJhY2tpbmdTZXJ2ZXJTZWN1cmUiOiJjYnNkaWdpdGFsbWVkaWEuZDEuc2Mub210cmRjLm5ldCIsImpvYklkIjoic2NfdmEiLCJtYXJrZXRpbmdDbG91ZElkIjoiODIzQkEwMzM1NTY3NDk3RjdGMDAwMTAxQEFkb2JlT3JnIiwicHJvZmlsZSI6ImNicyIsInB1Ymxpc2hlcklkIjoiY2JzbG9jYWwiLCJ0cmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5oYi5vbXRyZGMubmV0IiwidmVyc2lvbiI6IjEuNSJ9LCJtb2F0Ijp7ImNsaWVudFNpZGUiOnsicGFydG5lckNvZGUiOiJjYnNsb2NhbGFudmF0b3ZpZGVvMTgxNzMyNjA5NDMxIn19fSwiaHRtbDUiOnRydWUsInRva2VuIjoiZGVmYXVsdCJ9'></iframe>
        </VideoPlayerWrapper>
        <VideoPlayerWrapper>
          <iframe title='Salesforce 2'
            src='https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJtIjoiY2JzIiwidiI6ImM1MDgiLCJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsInNoYXJlTGluayI6Imh0dHBzOi8vdzMubXAubHVyYS5saXZlL3BsYXllci9wcm9kL3YzL2FudmxvYWQuaHRtbD9rZXk9ZXlKaGJuWmhZMnNpT2lJMVZrUTJSWGxrTm1ScVpYZGlRMjFPZDBKR2JuTkthakUzV1VGMlIxSjNiQ0lzSW1WNGNHVmpkRkJ5WlhKdmJHd2lPblJ5ZFdVc0ltVjRjR1ZqZEZCeVpYSnZiR3hVYVcxbGIzVjBJam8xTENKb2RHMXNOU0k2ZEhKMVpTd2liU0k2SW1OaWN5SXNJbkJzZFdkcGJuTWlPbnNpWTI5dGMyTnZjbVVpT25zaVl6TWlPaUp6WVc1bWNtRnVZMmx6WTI4dVkySnpiRzlqWVd3dVkyOXRJaXdpWTJ4cFpXNTBTV1FpT2lJek1EQXdNREl6SW4wc0ltUm1jQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbUZrVkdGblZYSnNJam9pYUhSMGNEb3ZMM0IxWW1Ga2N5NW5MbVJ2ZFdKc1pXTnNhV05yTG01bGRDOW5ZVzF3WVdRdllXUnpQM042UFRKNE1seDFNREF5Tm1sMVBTODBNVEk0TDJOaWN5NXpabHgxTURBeU5tTnBkVjl6ZW5OY2RUQXdNalpwYlhCc1BYTmNkVEF3TWpablpHWndYM0psY1QweFhIVXdNREkyWlc1MlBYWndYSFV3TURJMmIzVjBjSFYwUFhodGJGOTJZWE4wTWx4MU1EQXlOblZ1ZG1sbGQyVmtYM0J2YzJsMGFXOXVYM04wWVhKMFBURmNkVEF3TWpaMWNtdzlXM0psWm1WeWNtVnlYM1Z5YkYxY2RUQXdNalprWlhOamNtbHdkR2x2Ymw5MWNtdzlXMlJsYzJOeWFYQjBhVzl1WDNWeWJGMWNkVEF3TWpaamIzSnlaV3hoZEc5eVBWdDBhVzFsYzNSaGJYQmRJaXdpYTJWNVZtRnNkV1Z6SWpwN0ltTmhkR1ZuYjNKcFpYTWlPaUpiVzBOQlZFVkhUMUpKUlZOZFhTSXNJbkJ5YjJkeVlXMGlPaUpiVzFCU1QwZFNRVTFmVGtGTlJWMWRJaXdpYzJsMFpWTmxZM1JwYjI0aU9pSjJhV1JsYnkxbGVIQmxjbWxsYm1ObEluMTlmU3dpYUdWaGNuUmlaV0YwUW1WMFlTSTZleUpoWTJOdmRXNTBJam9pWTJKemJHOWpZV3d0WjJ4dlltRnNMWFZ1YVdacFpXUWlMQ0pqYUdGd2RHVnlWSEpoWTJ0cGJtY2lPbVpoYkhObExDSmpkWE4wYjIxTlpYUmhaR0YwWVNJNmV5SjJhV1JsYnlJNmV5SmpZbk5mYldGeWEyVjBJam9pYzJGdVpuSmhibU5wYzJOdkxtTmljMnh2WTJGc0xtTnZiU0lzSW1OaWMxOXdiR0YwWm05eWJTSTZJbVJsYzJ0MGIzQWlmWDBzSW1OMWMzUnZiVlJ5WVdOcmFXNW5VMlZ5ZG1WeUlqb2lZMkp6WkdsbmFYUmhiRzFsWkdsaExtUXhMbk5qTG05dGRISmtZeTV1WlhRaUxDSmpkWE4wYjIxVWNtRmphMmx1WjFObGNuWmxjbE5sWTNWeVpTSTZJbU5pYzJScFoybDBZV3h0WldScFlTNWtNUzV6WXk1dmJYUnlaR011Ym1WMElpd2lhbTlpU1dRaU9pSnpZMTkyWVNJc0ltMWhjbXRsZEdsdVowTnNiM1ZrU1dRaU9pSTRNak5DUVRBek16VTFOamMwT1RkR04wWXdNREF4TURGQVFXUnZZbVZQY21jaUxDSndTVzV6ZEdGdVkyVWlPaUp3TUNJc0luQnliMlpwYkdVaU9pSmpZbk1pTENKd2RXSnNhWE5vWlhKSlpDSTZJbU5pYzJ4dlkyRnNJaXdpZEhKaFkydHBibWRUWlhKMlpYSWlPaUpqWW5Oa2FXZHBkR0ZzYldWa2FXRXVhR0l1YjIxMGNtUmpMbTVsZENJc0luWmxjbk5wYjI0aU9pSXhMalVpZlN3aWJXOWhkQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbkJoY25SdVpYSkRiMlJsSWpvaVkySnpiRzlqWVd4aGJuWmhkRzkyYVdSbGJ6RTRNVGN6TWpZd09UUXpNU0o5Zlgwc0luUnZhMlZ1SWpvaVpHVm1ZWFZzZENJc0luWWlPaUpqTlRBNEluMCIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4MiZpdT0vNDEyOC9jYnMuc2YmY2l1X3N6cyZpbXBsPXMmZ2RmcF9yZXE9MSZlbnY9dnAmb3V0cHV0PXhtbF92YXN0MiZ1bnZpZXdlZF9wb3NpdGlvbl9zdGFydD0xJnVybD1bcmVmZXJyZXJfdXJsXSZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF0mY29ycmVsYXRvcj1bdGltZXN0YW1wXSIsImtleVZhbHVlcyI6eyJjYXRlZ29yaWVzIjoiW1tDQVRFR09SSUVTXV0iLCJwcm9ncmFtIjoiW1tQUk9HUkFNX05BTUVdXSIsInNpdGVTZWN0aW9uIjoidmlkZW8tZXhwZXJpZW5jZSJ9fX0sImhlYXJ0YmVhdEJldGEiOnsiYWNjb3VudCI6ImNic2xvY2FsLWdsb2JhbC11bmlmaWVkIiwiY2hhcHRlclRyYWNraW5nIjpmYWxzZSwiY3VzdG9tTWV0YWRhdGEiOnsidmlkZW8iOnsiY2JzX21hcmtldCI6InNhbmZyYW5jaXNjby5jYnNsb2NhbC5jb20iLCJjYnNfcGxhdGZvcm0iOiJkZXNrdG9wIn19LCJjdXN0b21UcmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0IiwiY3VzdG9tVHJhY2tpbmdTZXJ2ZXJTZWN1cmUiOiJjYnNkaWdpdGFsbWVkaWEuZDEuc2Mub210cmRjLm5ldCIsImpvYklkIjoic2NfdmEiLCJtYXJrZXRpbmdDbG91ZElkIjoiODIzQkEwMzM1NTY3NDk3RjdGMDAwMTAxQEFkb2JlT3JnIiwicHJvZmlsZSI6ImNicyIsInB1Ymxpc2hlcklkIjoiY2JzbG9jYWwiLCJ0cmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5oYi5vbXRyZGMubmV0IiwidmVyc2lvbiI6IjEuNSJ9LCJtb2F0Ijp7ImNsaWVudFNpZGUiOnsicGFydG5lckNvZGUiOiJjYnNsb2NhbGFudmF0b3ZpZGVvMTgxNzMyNjA5NDMxIn19fSwiaHRtbDUiOnRydWUsInRva2VuIjoiZGVmYXVsdCJ9'></iframe>
        </VideoPlayerWrapper>
        <VideoPlayerWrapper>
          <iframe title='Salesforce 3'
            src='https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJtIjoiY2JzIiwidiI6ImM1MDkiLCJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsInNoYXJlTGluayI6Imh0dHBzOi8vdzMubXAubHVyYS5saXZlL3BsYXllci9wcm9kL3YzL2FudmxvYWQuaHRtbD9rZXk9ZXlKaGJuWmhZMnNpT2lJMVZrUTJSWGxrTm1ScVpYZGlRMjFPZDBKR2JuTkthakUzV1VGMlIxSjNiQ0lzSW1WNGNHVmpkRkJ5WlhKdmJHd2lPblJ5ZFdVc0ltVjRjR1ZqZEZCeVpYSnZiR3hVYVcxbGIzVjBJam8xTENKb2RHMXNOU0k2ZEhKMVpTd2liU0k2SW1OaWN5SXNJbkJzZFdkcGJuTWlPbnNpWTI5dGMyTnZjbVVpT25zaVl6TWlPaUp6WVc1bWNtRnVZMmx6WTI4dVkySnpiRzlqWVd3dVkyOXRJaXdpWTJ4cFpXNTBTV1FpT2lJek1EQXdNREl6SW4wc0ltUm1jQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbUZrVkdGblZYSnNJam9pYUhSMGNEb3ZMM0IxWW1Ga2N5NW5MbVJ2ZFdKc1pXTnNhV05yTG01bGRDOW5ZVzF3WVdRdllXUnpQM042UFRKNE1seDFNREF5Tm1sMVBTODBNVEk0TDJOaWN5NXpabHgxTURBeU5tTnBkVjl6ZW5OY2RUQXdNalpwYlhCc1BYTmNkVEF3TWpablpHWndYM0psY1QweFhIVXdNREkyWlc1MlBYWndYSFV3TURJMmIzVjBjSFYwUFhodGJGOTJZWE4wTWx4MU1EQXlOblZ1ZG1sbGQyVmtYM0J2YzJsMGFXOXVYM04wWVhKMFBURmNkVEF3TWpaMWNtdzlXM0psWm1WeWNtVnlYM1Z5YkYxY2RUQXdNalprWlhOamNtbHdkR2x2Ymw5MWNtdzlXMlJsYzJOeWFYQjBhVzl1WDNWeWJGMWNkVEF3TWpaamIzSnlaV3hoZEc5eVBWdDBhVzFsYzNSaGJYQmRJaXdpYTJWNVZtRnNkV1Z6SWpwN0ltTmhkR1ZuYjNKcFpYTWlPaUpiVzBOQlZFVkhUMUpKUlZOZFhTSXNJbkJ5YjJkeVlXMGlPaUpiVzFCU1QwZFNRVTFmVGtGTlJWMWRJaXdpYzJsMFpWTmxZM1JwYjI0aU9pSjJhV1JsYnkxbGVIQmxjbWxsYm1ObEluMTlmU3dpYUdWaGNuUmlaV0YwUW1WMFlTSTZleUpoWTJOdmRXNTBJam9pWTJKemJHOWpZV3d0WjJ4dlltRnNMWFZ1YVdacFpXUWlMQ0pqYUdGd2RHVnlWSEpoWTJ0cGJtY2lPbVpoYkhObExDSmpkWE4wYjIxTlpYUmhaR0YwWVNJNmV5SjJhV1JsYnlJNmV5SmpZbk5mYldGeWEyVjBJam9pYzJGdVpuSmhibU5wYzJOdkxtTmljMnh2WTJGc0xtTnZiU0lzSW1OaWMxOXdiR0YwWm05eWJTSTZJbVJsYzJ0MGIzQWlmWDBzSW1OMWMzUnZiVlJ5WVdOcmFXNW5VMlZ5ZG1WeUlqb2lZMkp6WkdsbmFYUmhiRzFsWkdsaExtUXhMbk5qTG05dGRISmtZeTV1WlhRaUxDSmpkWE4wYjIxVWNtRmphMmx1WjFObGNuWmxjbE5sWTNWeVpTSTZJbU5pYzJScFoybDBZV3h0WldScFlTNWtNUzV6WXk1dmJYUnlaR011Ym1WMElpd2lhbTlpU1dRaU9pSnpZMTkyWVNJc0ltMWhjbXRsZEdsdVowTnNiM1ZrU1dRaU9pSTRNak5DUVRBek16VTFOamMwT1RkR04wWXdNREF4TURGQVFXUnZZbVZQY21jaUxDSndTVzV6ZEdGdVkyVWlPaUp3TUNJc0luQnliMlpwYkdVaU9pSmpZbk1pTENKd2RXSnNhWE5vWlhKSlpDSTZJbU5pYzJ4dlkyRnNJaXdpZEhKaFkydHBibWRUWlhKMlpYSWlPaUpqWW5Oa2FXZHBkR0ZzYldWa2FXRXVhR0l1YjIxMGNtUmpMbTVsZENJc0luWmxjbk5wYjI0aU9pSXhMalVpZlN3aWJXOWhkQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbkJoY25SdVpYSkRiMlJsSWpvaVkySnpiRzlqWVd4aGJuWmhkRzkyYVdSbGJ6RTRNVGN6TWpZd09UUXpNU0o5Zlgwc0luUnZhMlZ1SWpvaVpHVm1ZWFZzZENJc0luWWlPaUpqTlRBNUluMCIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4MiZpdT0vNDEyOC9jYnMuc2YmY2l1X3N6cyZpbXBsPXMmZ2RmcF9yZXE9MSZlbnY9dnAmb3V0cHV0PXhtbF92YXN0MiZ1bnZpZXdlZF9wb3NpdGlvbl9zdGFydD0xJnVybD1bcmVmZXJyZXJfdXJsXSZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF0mY29ycmVsYXRvcj1bdGltZXN0YW1wXSIsImtleVZhbHVlcyI6eyJjYXRlZ29yaWVzIjoiW1tDQVRFR09SSUVTXV0iLCJwcm9ncmFtIjoiW1tQUk9HUkFNX05BTUVdXSIsInNpdGVTZWN0aW9uIjoidmlkZW8tZXhwZXJpZW5jZSJ9fX0sImhlYXJ0YmVhdEJldGEiOnsiYWNjb3VudCI6ImNic2xvY2FsLWdsb2JhbC11bmlmaWVkIiwiY2hhcHRlclRyYWNraW5nIjpmYWxzZSwiY3VzdG9tTWV0YWRhdGEiOnsidmlkZW8iOnsiY2JzX21hcmtldCI6InNhbmZyYW5jaXNjby5jYnNsb2NhbC5jb20iLCJjYnNfcGxhdGZvcm0iOiJkZXNrdG9wIn19LCJjdXN0b21UcmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0IiwiY3VzdG9tVHJhY2tpbmdTZXJ2ZXJTZWN1cmUiOiJjYnNkaWdpdGFsbWVkaWEuZDEuc2Mub210cmRjLm5ldCIsImpvYklkIjoic2NfdmEiLCJtYXJrZXRpbmdDbG91ZElkIjoiODIzQkEwMzM1NTY3NDk3RjdGMDAwMTAxQEFkb2JlT3JnIiwicHJvZmlsZSI6ImNicyIsInB1Ymxpc2hlcklkIjoiY2JzbG9jYWwiLCJ0cmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5oYi5vbXRyZGMubmV0IiwidmVyc2lvbiI6IjEuNSJ9LCJtb2F0Ijp7ImNsaWVudFNpZGUiOnsicGFydG5lckNvZGUiOiJjYnNsb2NhbGFudmF0b3ZpZGVvMTgxNzMyNjA5NDMxIn19fSwiaHRtbDUiOnRydWUsInRva2VuIjoiZGVmYXVsdCJ9'></iframe>
        </VideoPlayerWrapper>
        <VideoPlayerWrapper>
          <iframe title='Salesforce 4'
            src='https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJtIjoiY2JzIiwidiI6ImM1MTAiLCJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsInNoYXJlTGluayI6Imh0dHBzOi8vdzMubXAubHVyYS5saXZlL3BsYXllci9wcm9kL3YzL2FudmxvYWQuaHRtbD9rZXk9ZXlKaGJuWmhZMnNpT2lJMVZrUTJSWGxrTm1ScVpYZGlRMjFPZDBKR2JuTkthakUzV1VGMlIxSjNiQ0lzSW1WNGNHVmpkRkJ5WlhKdmJHd2lPblJ5ZFdVc0ltVjRjR1ZqZEZCeVpYSnZiR3hVYVcxbGIzVjBJam8xTENKb2RHMXNOU0k2ZEhKMVpTd2liU0k2SW1OaWN5SXNJbkJzZFdkcGJuTWlPbnNpWTI5dGMyTnZjbVVpT25zaVl6TWlPaUp6WVc1bWNtRnVZMmx6WTI4dVkySnpiRzlqWVd3dVkyOXRJaXdpWTJ4cFpXNTBTV1FpT2lJek1EQXdNREl6SW4wc0ltUm1jQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbUZrVkdGblZYSnNJam9pYUhSMGNEb3ZMM0IxWW1Ga2N5NW5MbVJ2ZFdKc1pXTnNhV05yTG01bGRDOW5ZVzF3WVdRdllXUnpQM042UFRKNE1seDFNREF5Tm1sMVBTODBNVEk0TDJOaWN5NXpabHgxTURBeU5tTnBkVjl6ZW5OY2RUQXdNalpwYlhCc1BYTmNkVEF3TWpablpHWndYM0psY1QweFhIVXdNREkyWlc1MlBYWndYSFV3TURJMmIzVjBjSFYwUFhodGJGOTJZWE4wTWx4MU1EQXlOblZ1ZG1sbGQyVmtYM0J2YzJsMGFXOXVYM04wWVhKMFBURmNkVEF3TWpaMWNtdzlXM0psWm1WeWNtVnlYM1Z5YkYxY2RUQXdNalprWlhOamNtbHdkR2x2Ymw5MWNtdzlXMlJsYzJOeWFYQjBhVzl1WDNWeWJGMWNkVEF3TWpaamIzSnlaV3hoZEc5eVBWdDBhVzFsYzNSaGJYQmRJaXdpYTJWNVZtRnNkV1Z6SWpwN0ltTmhkR1ZuYjNKcFpYTWlPaUpiVzBOQlZFVkhUMUpKUlZOZFhTSXNJbkJ5YjJkeVlXMGlPaUpiVzFCU1QwZFNRVTFmVGtGTlJWMWRJaXdpYzJsMFpWTmxZM1JwYjI0aU9pSjJhV1JsYnkxbGVIQmxjbWxsYm1ObEluMTlmU3dpYUdWaGNuUmlaV0YwUW1WMFlTSTZleUpoWTJOdmRXNTBJam9pWTJKemJHOWpZV3d0WjJ4dlltRnNMWFZ1YVdacFpXUWlMQ0pqYUdGd2RHVnlWSEpoWTJ0cGJtY2lPbVpoYkhObExDSmpkWE4wYjIxTlpYUmhaR0YwWVNJNmV5SjJhV1JsYnlJNmV5SmpZbk5mYldGeWEyVjBJam9pYzJGdVpuSmhibU5wYzJOdkxtTmljMnh2WTJGc0xtTnZiU0lzSW1OaWMxOXdiR0YwWm05eWJTSTZJbVJsYzJ0MGIzQWlmWDBzSW1OMWMzUnZiVlJ5WVdOcmFXNW5VMlZ5ZG1WeUlqb2lZMkp6WkdsbmFYUmhiRzFsWkdsaExtUXhMbk5qTG05dGRISmtZeTV1WlhRaUxDSmpkWE4wYjIxVWNtRmphMmx1WjFObGNuWmxjbE5sWTNWeVpTSTZJbU5pYzJScFoybDBZV3h0WldScFlTNWtNUzV6WXk1dmJYUnlaR011Ym1WMElpd2lhbTlpU1dRaU9pSnpZMTkyWVNJc0ltMWhjbXRsZEdsdVowTnNiM1ZrU1dRaU9pSTRNak5DUVRBek16VTFOamMwT1RkR04wWXdNREF4TURGQVFXUnZZbVZQY21jaUxDSndTVzV6ZEdGdVkyVWlPaUp3TUNJc0luQnliMlpwYkdVaU9pSmpZbk1pTENKd2RXSnNhWE5vWlhKSlpDSTZJbU5pYzJ4dlkyRnNJaXdpZEhKaFkydHBibWRUWlhKMlpYSWlPaUpqWW5Oa2FXZHBkR0ZzYldWa2FXRXVhR0l1YjIxMGNtUmpMbTVsZENJc0luWmxjbk5wYjI0aU9pSXhMalVpZlN3aWJXOWhkQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbkJoY25SdVpYSkRiMlJsSWpvaVkySnpiRzlqWVd4aGJuWmhkRzkyYVdSbGJ6RTRNVGN6TWpZd09UUXpNU0o5Zlgwc0luUnZhMlZ1SWpvaVpHVm1ZWFZzZENJc0luWWlPaUpqTlRFd0luMCIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4MiZpdT0vNDEyOC9jYnMuc2YmY2l1X3N6cyZpbXBsPXMmZ2RmcF9yZXE9MSZlbnY9dnAmb3V0cHV0PXhtbF92YXN0MiZ1bnZpZXdlZF9wb3NpdGlvbl9zdGFydD0xJnVybD1bcmVmZXJyZXJfdXJsXSZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF0mY29ycmVsYXRvcj1bdGltZXN0YW1wXSIsImtleVZhbHVlcyI6eyJjYXRlZ29yaWVzIjoiW1tDQVRFR09SSUVTXV0iLCJwcm9ncmFtIjoiW1tQUk9HUkFNX05BTUVdXSIsInNpdGVTZWN0aW9uIjoidmlkZW8tZXhwZXJpZW5jZSJ9fX0sImhlYXJ0YmVhdEJldGEiOnsiYWNjb3VudCI6ImNic2xvY2FsLWdsb2JhbC11bmlmaWVkIiwiY2hhcHRlclRyYWNraW5nIjpmYWxzZSwiY3VzdG9tTWV0YWRhdGEiOnsidmlkZW8iOnsiY2JzX21hcmtldCI6InNhbmZyYW5jaXNjby5jYnNsb2NhbC5jb20iLCJjYnNfcGxhdGZvcm0iOiJkZXNrdG9wIn19LCJjdXN0b21UcmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0IiwiY3VzdG9tVHJhY2tpbmdTZXJ2ZXJTZWN1cmUiOiJjYnNkaWdpdGFsbWVkaWEuZDEuc2Mub210cmRjLm5ldCIsImpvYklkIjoic2NfdmEiLCJtYXJrZXRpbmdDbG91ZElkIjoiODIzQkEwMzM1NTY3NDk3RjdGMDAwMTAxQEFkb2JlT3JnIiwicHJvZmlsZSI6ImNicyIsInB1Ymxpc2hlcklkIjoiY2JzbG9jYWwiLCJ0cmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5oYi5vbXRyZGMubmV0IiwidmVyc2lvbiI6IjEuNSJ9LCJtb2F0Ijp7ImNsaWVudFNpZGUiOnsicGFydG5lckNvZGUiOiJjYnNsb2NhbGFudmF0b3ZpZGVvMTgxNzMyNjA5NDMxIn19fSwiaHRtbDUiOnRydWUsInRva2VuIjoiZGVmYXVsdCJ9'></iframe>
        </VideoPlayerWrapper>
      </Box>

      <Box sx={{my: 2}}>
        <Typography sx={{my: 1}} variant='h6' component='h2'>
          Golden Gate Bridge from Tiburon
        </Typography>
        <a href='https://www.sheltons.net/wx/station.html'>
          <img src='https://www.sheltons.net/wx/webcam.jpg' alt='Golden Gate Bridge from Tiburon' style={{width: '100%'}}></img>
        </a>
      </Box>

      <Box sx={{my: 2}}>
        <Typography sx={{my: 1}} variant='h6' component='h2'>
          Half Moon Bay
        </Typography>
        <a href='https://www.samschowderhouse.com/about-sams/samcam.html'>
          <img src='https://samcam1.samschowderhouse.com:20001/axis-cgi/jpg/image.cgi?resolution=640x480&color=1&clock=1&date=1'
            alt='Half Moon Bay' style={{width: '100%'}}></img>
        </a>
        <a href='https://www.samschowderhouse.com/about-sams/samcam.html'>
          <img src='https://samcam2.samschowderhouse.com:20002/axis-cgi/jpg/image.cgi?resolution=640x480&color=1&clock=1&date=1'
            alt='Half Moon Bay' style={{width: '100%'}}></img>
        </a>
      </Box>

      <Box sx={{my: 2}}>
        <Typography sx={{my: 1}} variant='h6' component='h2'>
          Ocean Beach
        </Typography>
        <a href='https://www.oceanbeach.org/webcam.html'>
          <img src='https://www.oceanbeach.org/images/sunset.jpg'
            alt='Ocean Beach' style={{width: '100%'}}></img>
        </a>
        <a href='https://video-monitoring.com/beachcams/oceanbeach/'>
          <img src='https://video-monitoring.com/beachcams/oceanbeach/static/s4latest_.jpg'
            alt='Ocean Beach' style={{width: '100%'}}></img>
        </a>
      </Box>

      <Box sx={{
        textAlign: 'center',
        my: 2,
      }}>
        <Typography variant='caption'>
          <Box>&copy; 2024 bay.camera</Box>
          <Box>
            This site uses&nbsp;<Link href='https://twemoji.twitter.com'>Twemoji graphics</Link>&nbsp;licensed under&nbsp;<Link href='https://creativecommons.org/licenses/by/4.0/'>CC-BY 4.0</Link>
          </Box>
        </Typography>
      </Box>

      <Fab color='primary' size='medium' aria-label='feedback'
        sx={{position: 'fixed', right: 24, bottom: 24}}
        href='https://github.com/gongruya/bay-camera/issues'
        target='_blank'
      >
        <FeedbackIcon />
      </Fab>
    </>
  );
};

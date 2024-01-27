import {useMemo} from 'react';

import {Header} from '@/components/Header';
import {Container} from '@mui/material';
import {SpeedInsights} from '@vercel/speed-insights/next';

export default function Template({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      <Container maxWidth='md'>
        {children}
      </Container>
      <SpeedInsights />
    </>
  );
};

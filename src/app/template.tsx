import {Header} from '@/components/Header';
import {Container} from '@mui/material';

export default function Template({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      <Container maxWidth='md'>
        {children}
      </Container>
    </>
  );
};

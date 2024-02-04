import {Metadata} from 'next';
import {CloudPageWrapper} from './CloudPageWrapper';

export const metadata: Metadata = {
  title: 'Cloud Forecast',
  description:
    'An interactive cloud forecast map for sunrise and sunrise prediction.',
};

export default function Home() {
  return <CloudPageWrapper />
};

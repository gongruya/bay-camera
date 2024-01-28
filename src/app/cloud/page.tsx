'use client'

import dynamic from 'next/dynamic';
const LeafletMapContainer =
  dynamic(() => import('@/app/cloud/LeafletMapContainer'), {ssr: false});

export default function Home() {
  return <LeafletMapContainer style={{
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }} />
};

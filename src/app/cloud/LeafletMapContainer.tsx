import React, {CSSProperties} from 'react';
import {CloudCoverage} from '@/weather/hrrr';
import {LatLngType} from '@/geo/latlng';

import dynamic from 'next/dynamic';
const LeafletMap =
  dynamic(() => import('@/leaflet/LeafletMap'), {ssr: false});
const LeafletTileLayer =
  dynamic(() => import('@/leaflet/LeafletTileLayer'), {ssr: false});
const LeafletHeatmapLayer =
  dynamic(() => import('@/leaflet/LeafletHeatmapLayer'), {ssr: false});
const LeafletPopup =
  dynamic(() => import('@/leaflet/LeafletPopup'), {ssr: false});

export interface LeafletMapContainerProps {
  style: CSSProperties;
  center: LatLngType;
  cloudMap: CloudCoverage[];
  onMove: (bounds: L.LatLngBounds) => void;
  onClick: (latlng: L.LatLng) => void;
  onValueAvailable: (value: number) => void;
  popup?: React.ReactNode;
}

export function LeafletMapContainer(props: LeafletMapContainerProps) {
  return (
    <LeafletMap center={props.center}
      options={{
        zoomSnap: 1,
        zoomDelta: 1,
        maxBounds: [[18, -135], [55, -60]],
        zoom: 8,
        minZoom: 5,
        maxZoom: 10,
      }}
      zoom={8}
      style={props.style}
      onMove={props.onMove}
      onClick={props.onClick}
    >
      <LeafletTileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        options={{
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }} />
      <LeafletHeatmapLayer data={props.cloudMap} maxValue={100}
        onValueAvailable={props.onValueAvailable} />
      <LeafletPopup options={{autoPan: false}}>
        {props.popup}
      </LeafletPopup>
    </LeafletMap>
  );
};

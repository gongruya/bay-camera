import React, {CSSProperties} from 'react';
import {CloudCoverage} from '@/weather/hrrr';
import {LeafletHeatmapLayer} from '@/leaflet/LeafletHeatmapLayer';
import {LeafletMap} from '@/leaflet/LeafletMap';
import {LeafletTileLayer} from '@/leaflet/LeafletTileLayer';
import {LatLngExpression} from 'leaflet';

export interface LeafletMapContainerProps {
  style: CSSProperties;
  center: LatLngExpression;
  cloudMap: CloudCoverage[];
  onMove: (bounds: L.LatLngBounds) => void;
  onClick: (latlng: L.LatLng) => void;
  onValueAvailable: (value: number) => void;
  popup?: React.ReactNode;
}

export default function LeafletMapContainer(props: LeafletMapContainerProps) {
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
      style={props.style}
      onMove={props.onMove}
      onClick={props.onClick}
      popup={props.popup}
    >
      <LeafletTileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        options={{
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }} />
      <LeafletHeatmapLayer data={props.cloudMap} maxValue={100}
        onValueAvailable={props.onValueAvailable} />
    </LeafletMap>
  );
};

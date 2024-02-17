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
      style={props.style}
      onMove={props.onMove}
      onClick={props.onClick}
      popup={props.popup}
    >
      <LeafletTileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        options={{
          maxZoom: 10,
          minZoom: 5,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }} />
      <LeafletHeatmapLayer data={props.cloudMap} maxValue={100}
        onValueAvailable={props.onValueAvailable} />
    </LeafletMap>
  );
};

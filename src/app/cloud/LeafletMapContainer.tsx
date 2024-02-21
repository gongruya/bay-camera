import React, {CSSProperties} from 'react';
import {CloudCoverage} from '@/weather/hrrr';
import {LatLngType} from '@/geo/latlng';
import {LatLngExpression} from 'leaflet';
import {LeafletMap} from 'reaflet-map';
import {LeafletPopup} from 'reaflet-map/ui';
import {LeafletTileLayer} from 'reaflet-map/raster';
import {LeafletHeatmapLayer} from '@/leaflet/LeafletHeatmapLayer';

export interface LeafletMapContainerProps {
  style: CSSProperties;
  center: LatLngType;
  cloudMap: CloudCoverage[];
  onMove: (bounds: L.LatLngBounds) => void;
  onClick: (latlng: L.LatLng) => void;
  onValueAvailable: (value: number) => void;
  pinLocation?: LatLngExpression;
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
      zoom={8}
      style={props.style}
      onMoveEnd={(_e, map) => props.onMove(map.getBounds())}
      onClick={({latlng}) => props.onClick(latlng)}
    >
      <LeafletTileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        options={{
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }} />
      <LeafletHeatmapLayer data={props.cloudMap} maxValue={100}
        onValueAvailable={props.onValueAvailable} />
      <LeafletPopup options={{autoPan: false}} latlng={props.pinLocation}>
        {props.popup}
      </LeafletPopup>
    </LeafletMap>
  );
};

import 'leaflet/dist/leaflet.css';
import React, {useEffect, CSSProperties, useState} from 'react';
import {MapContainer, TileLayer, useMap, useMapEvent} from 'react-leaflet';
import L, {LatLngExpression} from 'leaflet';
import {CloudCoverage} from '@/weather/hrrr';

// leaflet-heatmap has no typescript declaration.
const HeatmapOverlay = require('leaflet-heatmap');

const HEAT_MAP_GRADIENT = {
  .1: '#24a0f2',
  .2: '#4eb0f2',
  .3: '#80b7f8',
  .4: '#a0c8ff',
  .5: '#d2e1ff',
  .6: '#e1e1e1',
  .7: '#c9c9c9',
  .8: '#a5a5a5',
  .9: '#6e6e6e',
  1: '#505050',
}

function FlyMapTo(props: {center: LatLngExpression}) {
  const map = useMap();

  useEffect(() => {
    map.setView(props.center);
  });

  return null;
}

function CloudHeatMap(props: {heatLayer: any, cloudMap: CloudCoverage[], onChange: (bounds: L.LatLngBounds) => void}) {
  const map = useMap();
  if (!map.hasLayer(props.heatLayer)) {
    props.heatLayer.addTo(map);
  }

  useEffect(() => {
    props.onChange(map.getBounds());
  }, []);

  useEffect(() => {
    props.heatLayer.setData({
      max: 100,
      data: props.cloudMap,
    });
  }, [props.cloudMap]);

  useMapEvent('moveend', () => {
    props.onChange(map.getBounds());
  });

  return null;
}

interface LeafletMapContainerProps {
  style: CSSProperties;
  cloudMap: CloudCoverage[];
  onChange: (bounds: L.LatLngBounds) => void;
}

export default function LeafletMapContainer({style, cloudMap, onChange}: LeafletMapContainerProps) {
  // Center of the map defaulted to San Francisco.
  const [center, setCenter] =
    useState<LatLngExpression>([37.774546, -122.433523]);

  const [heatLayer, setHeatLayer] = useState(
    new HeatmapOverlay({
      radius: 0.2,
      maxOpacity: .85,
      scaleRadius: true,
      useLocalExtrema: false,
      gradient: {
        '.1': '#24a0f2',
        '.2': '#4eb0f2',
        '.3': '#80b7f8',
        '.4': '#a0c8ff',
        '.5': '#d2e1ff',
        '.6': '#e1e1e1',
        '.7': '#c9c9c9',
        '.8': '#a5a5a5',
        '.9': '#6e6e6e',
        '1': '#505050',
      },

      latField: 'lat',
      lngField: 'lng',
      valueField: 'val',
    }));

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        setCenter([latitude, longitude]);
      });
  }, []);

  return (
    <MapContainer center={center} zoom={8} style={style}
      zoomDelta={1} zoomSnap={1} maxBounds={[[18, -135], [55, -60]]}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={10}
        minZoom={6}
      />
      {/* <FlyMapTo center={center} /> */}
      <CloudHeatMap heatLayer={heatLayer} cloudMap={cloudMap} onChange={onChange} />
    </MapContainer>
  );
};

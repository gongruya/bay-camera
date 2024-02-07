import 'leaflet/dist/leaflet.css';
import React, {useEffect, CSSProperties, useState} from 'react';
import {MapContainer, TileLayer, useMap, useMapEvent} from 'react-leaflet';
import L, {LatLngExpression} from 'leaflet';
import {CloudCoverage} from '@/weather/hrrr';

// leaflet-heatmap has no typescript declaration.
const HeatmapOverlay = require('leaflet-heatmap');

const HEAT_MAP_GRADIENT = {
  '.1': '#222',
  '.2': '#444',
  '.3': '#666',
  '.4': '#888',
  '.5': '#999',
  '.6': '#bbb',
  '.7': '#ccc',
  '.8': '#ddd',
  '.9': '#eee',
  '1': '#fff',
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
      radius: 0.25,
      maxOpacity: .85,
      scaleRadius: true,
      useLocalExtrema: false,
      gradient: HEAT_MAP_GRADIENT,
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
        minZoom={5}
      />
      {/* <FlyMapTo center={center} /> */}
      <CloudHeatMap heatLayer={heatLayer} cloudMap={cloudMap} onChange={onChange} />
    </MapContainer>
  );
};

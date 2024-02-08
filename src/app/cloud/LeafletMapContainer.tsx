import 'leaflet/dist/leaflet.css';
import React, {useEffect, CSSProperties, useState, useCallback} from 'react';
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

interface LeafletMapContainerProps {
  style: CSSProperties;
  center: LatLngExpression;
  cloudMap: CloudCoverage[];
  onChange: (bounds: L.LatLngBounds) => void;
  onClick?: (latlng: L.LatLng) => void;
}

export default function LeafletMapContainer(props: LeafletMapContainerProps) {
  const {style, center, cloudMap, onChange, onClick} = props;
  const [heatLayer] = useState(
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

  const [map, setMap] = useState<L.Map>();

  const mapRef = useCallback((container: HTMLDivElement) => {
    const leafletMap = L.map(container, {
      zoomSnap: 1,
      zoomDelta: 1,
    }).setMaxBounds([[18, -135], [55, -60]]).setZoom(8);

    leafletMap.addEventListener('moveend', () => {
      if (onChange) {
        onChange(leafletMap.getBounds());
      }
    });

    leafletMap.addEventListener('click', ({latlng}) => {
      if (onClick) {
        onClick(latlng);
      }
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 10,
      minZoom: 5,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafletMap);
    heatLayer.addTo(leafletMap);

    setMap(leafletMap);
  }, [heatLayer]);

  useEffect(() => {
    map?.setView(center, 8);
  }, [map, center]);

  useEffect(() => {
    heatLayer.setData({
      max: 100,
      data: cloudMap,
    });
  }, [heatLayer, cloudMap]);

  return <div ref={mapRef} style={style} />;
};

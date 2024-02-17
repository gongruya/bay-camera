import {useEffect, useState} from 'react';
import {useLeafletMap} from './context';
import {LatLngLiteral} from 'leaflet';
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

export interface HeatmapData {
  lat: number;
  lng: number;
  val: number;
}

export interface LeafletHeatmapLayerProps {
  data: HeatmapData[];
  maxValue?: number;
  onValueAvailable?: (value: number, latlng: LatLngLiteral) => void;
};

export function LeafletHeatmapLayer({data, maxValue, onValueAvailable}: LeafletHeatmapLayerProps) {
  const maybeMap = useLeafletMap();
  const [latlng, setLatlng] = useState<LatLngLiteral>();

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

  useEffect(() => {
    maybeMap?.addLayer(heatLayer).addEventListener('click', ({latlng}) => {
      setLatlng(latlng);
    });
  }, [maybeMap]);

  useEffect(() => {
    heatLayer.setData({
      max: maxValue || 1.0,
      data: data,
    });
  }, [data]);

  useEffect(() => {
    if (onValueAvailable && maybeMap && latlng) {
      const value = heatLayer._heatmap.getValueAt(
        maybeMap.latLngToContainerPoint(latlng));
      onValueAvailable(value, latlng);
    }
  }, [data, latlng, maybeMap]);

  return null;
}

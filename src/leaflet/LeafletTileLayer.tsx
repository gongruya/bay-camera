import L, {TileLayerOptions} from 'leaflet';
import {useEffect} from 'react';
import {useLeafletMap} from './context';

export interface LeafletTileLayerProps {
  url: string;
  options?: TileLayerOptions;
};

export function LeafletTileLayer({url, options}: LeafletTileLayerProps) {
  const maybeMap = useLeafletMap();

  useEffect(() => {
    maybeMap?.addLayer(L.tileLayer(url, options));
  }, [url, options, maybeMap]);

  return null;
}

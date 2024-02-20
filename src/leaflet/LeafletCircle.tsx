import {Circle, CircleOptions, LatLngExpression} from 'leaflet';
import {useLeafletMap} from './context';
import {useEffect, useState} from 'react';

export interface LeafletCircleProps {
  latlng: LatLngExpression;
  options: CircleOptions;
}

export function LeafletCircle({latlng, options}: LeafletCircleProps) {
  const maybeMap = useLeafletMap();
  const [circle] = useState<Circle>(new Circle(latlng, options));

  useEffect(() => {
    maybeMap?.addLayer(circle);
  }, [maybeMap]);

  useEffect(() => {
    circle.setLatLng(latlng);
  }, [latlng]);

  return null;
}

export default LeafletCircle;

import {LatLngExpression, PopupOptions, Popup} from 'leaflet';
import {useState, useEffect, useRef} from 'react';
import {useLeafletMap} from './context';

export interface LeafletPopupProps {
  children: React.ReactNode;
  latlng?: LatLngExpression;
  options?: PopupOptions;
};

export function LeafletPopup({children, latlng, options}: LeafletPopupProps) {
  const maybeMap = useLeafletMap();

  const [leafletPopup] = useState(new Popup(options));
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (maybeMap && latlng && popupRef.current) {
      leafletPopup.setContent(popupRef.current);
      leafletPopup.setLatLng(latlng).openOn(maybeMap);
    }
  }, [latlng, maybeMap]);

  return <div ref={popupRef}>{children}</div>;
}

export default LeafletPopup;

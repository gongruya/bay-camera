import {PopupOptions, Popup} from 'leaflet';
import {useState, useEffect, useRef} from 'react';
import {useLeafletMap} from './context';

export interface LeafletPopupProps {
  children: React.ReactNode;
  options?: PopupOptions;
};

export function LeafletPopup({children, options}: LeafletPopupProps) {
  const maybeMap = useLeafletMap();

  const [leafletPopup] = useState(new Popup(options));
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    maybeMap?.addEventListener('click', ({latlng}) => {
      if (popupRef.current) {
        leafletPopup.setContent(popupRef.current);
      }
      leafletPopup.setLatLng(latlng).openOn(maybeMap);
    });
  }, [maybeMap]);

  return <div ref={popupRef}>{children}</div>;
}

export default LeafletPopup;

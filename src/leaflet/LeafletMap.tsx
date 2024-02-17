import 'leaflet/dist/leaflet.css';
import React, {useEffect, CSSProperties, useState, useCallback, useRef, Children} from 'react';
import L from 'leaflet';
import {LeafletContext} from './context';

export interface LeafletMapProps {
  style: CSSProperties;
  center: L.LatLngExpression;
  options?: L.MapOptions;
  onMove?: (bounds: L.LatLngBounds) => void;
  onClick?: (latlng: L.LatLng) => void;
  popup?: React.ReactNode;
  children?: React.ReactNode;
}

export function LeafletMap(props: LeafletMapProps) {
  const {style, center, options, onMove, onClick, popup, children} = props;
  const [map, setMap] = useState<L.Map>();
  const [leafletPopup] = useState(L.popup({minWidth: 1}));
  const popupRef = useRef<HTMLDivElement>(null);

  const mapRef = useCallback((container: HTMLDivElement) => {
    const leafletMap = L.map(container, options);

    leafletMap.addEventListener('moveend', () => {
      if (onMove) {
        onMove(leafletMap.getBounds());
      }
    });

    leafletMap.addEventListener('click', ({latlng}) => {
      if (popupRef.current) {
        leafletPopup.setContent(popupRef.current);
      }
      leafletPopup.setLatLng(latlng).openOn(leafletMap);

      if (onClick) {
        onClick(latlng);
      }
    });

    setMap(leafletMap);
  }, []);

  useEffect(() => {
    map?.setView(center, 8);
  }, [map, center]);

  return (
    <div ref={mapRef} style={style}>
      {popup && <div ref={popupRef}>{popup}</div>}
      <LeafletContext.Provider value={map}>
        {children}
      </LeafletContext.Provider>
    </div>
  );
};

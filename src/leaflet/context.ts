import {createContext, useContext} from 'react';
import L from 'leaflet';

export const LeafletContext = createContext<L.Map | undefined>(undefined);

export function useLeafletMap(): L.Map | undefined {
  return useContext(LeafletContext);
}

import { createContext } from 'react';

interface MapContextProps {
  isSearchingStart: boolean,
  setIsSearchingStart: (value: boolean) => void;
  isSearchingEnd: boolean,
  setIsSearchingEnd: (value: boolean) => void;
  startPoint: [number, number];
  setStartPoint: (point: [number, number]) => void;
  endPoint: [number, number];
  setEndPoint: (point: [number, number]) => void;
  wayPoint: number[];
  setWayPoint: (point: number[]) => void;
}

export const MapContext = createContext<MapContextProps>({ 
  isSearchingStart: false,
  setIsSearchingStart: () => {},
  isSearchingEnd: false,
  setIsSearchingEnd: () => {},
  startPoint: [0, 0],
  setStartPoint: () => {},
  endPoint: [0, 0],
  setEndPoint: () => {},
  wayPoint: [],
  setWayPoint: () => {},
});
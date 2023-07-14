import React, { createContext, ReactNode, useState } from 'react';

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

interface NaviCounterProps {
  naviSearchCounter: number;
  setNaviSearchCounter: (counter: number) => void;
  startNaviSearch: (counter: number) => void;
  naviDataResult: object;
  setNaviDataResult: (value: object) => void;
}

interface childrenProps {
  children: ReactNode;
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

export const NaviContext = createContext<NaviCounterProps>({
  naviSearchCounter: 0,
  setNaviSearchCounter: () => {},
  startNaviSearch: () => {},
  naviDataResult: {},
  setNaviDataResult: () => {},
});

export const NaviProvider: React.FC<childrenProps> = ({ children }) => {
  const [naviSearchCounter, setNaviSearchCounter] = useState<number>(0);
  const [naviDataResult, setNaviDataResult] = useState<Object>({});

  const startNaviSearch = () => {
    setNaviSearchCounter(prevCounter => prevCounter + 1);
    console.log('counter 값: ', naviSearchCounter);
  };

  return (
    <NaviContext.Provider
      value={{
        naviSearchCounter,
        setNaviSearchCounter,
        startNaviSearch,
        naviDataResult,
        setNaviDataResult
      }}
    >
      {children}
    </NaviContext.Provider>
  );
};
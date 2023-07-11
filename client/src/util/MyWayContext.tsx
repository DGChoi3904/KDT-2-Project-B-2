//! 사용 안하는 파일
import React, { createContext, useState } from 'react';

interface MyWayContextProps {
  showDetail: boolean;
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MyWayContext = createContext<MyWayContextProps>({
  showDetail: false,
  setShowDetail: () => {},
});

export const MyWayProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <MyWayContext.Provider value={{ showDetail, setShowDetail }}>
      {children}
    </MyWayContext.Provider>
  );
};

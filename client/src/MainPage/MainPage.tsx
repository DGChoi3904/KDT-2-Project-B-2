import React, { useState } from 'react';

import TopMenu from './Header/TopMenu';
import KakaoMap from './Body/KakaoMap';
import Footer from './Footer/MyWayBox';

import './Main.css';

function MainPage() {
  const [naviSearchCounter, setNaviSearchCounter] = useState<number>(0);
  const [naviDataResult, setNaviDataResult] = useState<Object>({});

  const startNaviSearch = () => {
    setNaviSearchCounter(naviSearchCounter + 1);
    console.log(naviSearchCounter);
  };

  return (
    <div className="MainWrap">
      {/* Header */}
      <TopMenu />
      {/* Body */}
      <KakaoMap
        naviSearchCounter={naviSearchCounter}
        setNaviSearchCounter={setNaviSearchCounter}
        startNaviSearch={startNaviSearch}
        setNaviDataResult={setNaviDataResult}
      />
      {/* Footer */}
      <Footer
        setNaviSearchCounter={setNaviSearchCounter}
        startNaviSearch={startNaviSearch}
        naviDataResult={naviDataResult}
      />
    </div>
  );
}

export default MainPage;

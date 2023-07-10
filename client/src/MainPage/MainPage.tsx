import React, { useState, useEffect } from 'react';

import TopMenu from './Header/TopMenu';
import KakaoMap from './Body/KakaoMap';
import Footer from './Footer/MyWayBox';

import './Main.css';

function MainPage() {
  const [login, setLogin] = useState<boolean>(false);
  const [detail, setDetail] = useState<boolean>(false);
  const [myWayDataResult] = useState<Object>({});
  const [naviSearchCounter, setNaviSearchCounter] = useState<number>(0);
  const startNaviSearch = () => {
    setNaviSearchCounter(naviSearchCounter + 1);
    console.log(naviSearchCounter);
  };
  const [currentMyWayNameObj, setCurrentMyWayNameObj] = useState<Object>({
    index: 0,
    name: '',
  }); //? 현재 저장된 길 이름
  

  return (
    <div className="MainWrap">
      {/* Header */}
      <TopMenu setLogin={setLogin} />
      {/* Body */}
      <KakaoMap setDetail={setDetail} naviSearchCounter={naviSearchCounter} setNaviSearchCounter={setNaviSearchCounter} startNaviSearch={startNaviSearch} setCurrentMyWayNameObj={setCurrentMyWayNameObj} />
      {/* Footer */}
      <Footer detail={detail} login={login} myWayDataResult={myWayDataResult} setNaviSearchCounter={setNaviSearchCounter} startNaviSearch={startNaviSearch} setCurrentMyWayNameObj={setCurrentMyWayNameObj} />
    </div>
  );
}

export default MainPage;

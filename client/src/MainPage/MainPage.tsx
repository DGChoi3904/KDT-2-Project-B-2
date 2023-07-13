import React, { useState } from 'react';

import TopMenu from './Header/TopMenu';
import KakaoMap from './Body/KakaoMap';
import Footer from './Footer/MyWayBox';

import './Main.css';

interface MyWayNameObj {
  index: number;
  name: string;
}

function MainPage() {
  const [login, setLogin] = useState<boolean>(false);
  const [detail, setDetail] = useState<boolean>(false);
  const [myWayDataResult, setMyWayDataResult] = useState<Object>({});
  const [naviSearchCounter, setNaviSearchCounter] = useState<number>(0);
  const [naviDataResult, setNaviDataResult] = useState<Object>({});
  const [myWayUI, setMyWayUI] = useState<boolean>(true);

  const startNaviSearch = () => {
    setNaviSearchCounter(naviSearchCounter + 1);
    console.log(naviSearchCounter);
  };
  const [currentMyWayNameObj, setCurrentMyWayNameObj] = useState<MyWayNameObj>({
    index: 0,
    name: '',
  }); //? 현재 저장된 길 이름

  return (
    <div className="MainWrap">
      {/* Header */}
      <TopMenu />
      {/* Body */}
      <KakaoMap
        setDetail={setDetail}
        naviSearchCounter={naviSearchCounter}
        setNaviSearchCounter={setNaviSearchCounter}
        startNaviSearch={startNaviSearch}
        setCurrentMyWayNameObj={setCurrentMyWayNameObj}
        setNaviDataResult={setNaviDataResult}
      />
      {/* Footer */}
      <Footer
        setDetail={setDetail}
        detail={detail}
        myWayDataResult={myWayDataResult}
        setNaviSearchCounter={setNaviSearchCounter}
        startNaviSearch={startNaviSearch}
        currentMyWayNameObj={currentMyWayNameObj}
        setCurrentMyWayNameObj={setCurrentMyWayNameObj}
        naviDataResult={naviDataResult}
      />
    </div>
  );
}

export default MainPage;

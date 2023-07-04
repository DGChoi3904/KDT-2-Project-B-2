import React, { useState, useEffect } from 'react';

import TopMenu from './TopMenu';
import KakaoMap from './KakaoMap';
import MyWayList from './MyWayList';
import MyWayDetail from './MyWayDetail';

import './Main.css';

function MainPage() {
  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = () => {
    setShowDetail(true);
  };

  return (
    <div className="MainWrap">
      <TopMenu />
      {/* 탑 */}
      <KakaoMap onButtonClicked={toggleDetail} />
      {/* 메인 */}
      {showDetail ? <MyWayDetail /> : <MyWayList />}
    </div>
  );
}

export default MainPage;

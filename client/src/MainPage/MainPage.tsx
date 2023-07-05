import React, { useState, useEffect } from 'react';

import TopMenu from './TopMenu';
import KakaoMap from './KakaoMap';
import MyWayList from './MyWayList';
import MyWayDetail from './MyWayDetail';

import './Main.css';

function MainPage() {
  return (
    <div className="MainWrap">
      <TopMenu />
      {/* 탑 */}
      <KakaoMap />
      {/* 메인 */}
      {}
    </div>
  );
}

export default MainPage;

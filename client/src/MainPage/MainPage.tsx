import React, { useState, useEffect } from 'react';

import TopMenu from './TopMenu';
import KakaoMap from './KakaoMap';
import MyWayList from './MyWayList';
import MyWayDetail from './MyWayDetail';

import './Main.css';

function MainPage() {
  const [login, setLogin] = useState<boolean>(false);

  return (
    <div className="MainWrap">
      <TopMenu setLogin={setLogin} />
      {/* 탑 */}
      <KakaoMap login={login} />
      {/* 메인 */}
      {}
    </div>
  );
}

export default MainPage;

import React from 'react';

import TopMenu from './TopMenu';
import KakaoMap from './KakaoMap';
import MyWayList from './MyWayList';
// 테스트를 위해 임시로 넣음

// import SearchBox from './SearchBox';
// import MongoCat from '../MongoDB/MongoCat';

import './Main.css';
import MyWayDetail from './MyWayDetail';

function MainPage() {
  return (
    <div className="MainWrap">
      <TopMenu />
      {/* 탑 */}
      <KakaoMap />
      {/* 메인 */}
      <MyWayList />
      {/* <MongoCat /> */}
      <MyWayDetail />
    </div>
  );
}

export default MainPage;

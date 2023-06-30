import React, { useState } from 'react';

import TopMenu from './TopMenu';
import KakaoMap from './KakaoMap';
import MyWayList from './MyWayList';
// 테스트를 위해 임시로 넣음
import LoginModal from './LoginModal';
import SearchBox from './SearchBox';
import SaveWayModal from './SaveWayModal';

import './Main.css';

function MainPage() {
  return (
    <div className='MainWrap'>
      <TopMenu />
      <KakaoMap />
      <MyWayList />
      <LoginModal />
      <SearchBox />
      <SaveWayModal />
    </div>
  )
}

export default MainPage;
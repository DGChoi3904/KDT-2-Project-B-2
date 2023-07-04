import React from 'react';

import TopMenu from './TopMenu';
import KakaoMap from './KakaoMap';
import MyWayList from './MyWayList';
// 테스트를 위해 임시로 넣음
import LoginModal from './LoginModal';
// import SearchBox from './SearchBox';
import SaveWayModal from './SaveWayModal';
import MongoCat from '../MongoDB/MongoCat';

import './Main.css';
import MyWayDetail from './MyWayDetail';
import SignUp from '../SignupPage/SignUp';

function MainPage() {
  return (
    <div className="MainWrap">
      <TopMenu />
      <KakaoMap />
      <MyWayList />
      <LoginModal />
      <SaveWayModal />
      <MongoCat />
      <MyWayDetail />
      <SignUp />
    </div>
  );
}

export default MainPage;

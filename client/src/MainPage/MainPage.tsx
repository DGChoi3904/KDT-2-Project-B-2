import React from 'react';

import TopMenu from './Header/TopMenu';
import KakaoMap from './Body/KakaoMap';
import Footer from './Footer/MyWayBox';

import './Main.css';

function MainPage() {

  return (
    <div className="MainWrap">
      {/* Header */}
      <TopMenu />
      {/* Body */}
      <KakaoMap
      />
      {/* Footer */}
      <Footer
      />
    </div>
  );
}

export default MainPage;

import React, { useState, useEffect } from 'react';

import TopMenu from './Header/TopMenu';
import KakaoMap from './Body/KakaoMap';
import Footer from './Footer/MyWayBox';

import './Main.css';

function MainPage() {
  const [login, setLogin] = useState<boolean>(false);
  const [detail, setDetail] = useState<boolean>(false);

  return (
    <div className="MainWrap">
      {/* Header */}
      <TopMenu setLogin={setLogin} />
      {/* Body */}
      <KakaoMap setDetail={setDetail}/>
      {/* Footer */}
      <Footer detail={detail}/>
    </div>
  );
}

export default MainPage;

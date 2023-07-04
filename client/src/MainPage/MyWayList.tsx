import React from 'react';
import KakaoMap from './KakaoMap';
import './Main.css';

import MyWayComponent from './MyWayComponent';

function MyWayList() {
  const userDbSample = [];
  const count = 3;

  return (
    <div>
      <div className="MyWayListTitle">
        <p>MyWay 목록</p>
        <div>UI 숨기기</div>
      </div>
      <div style={{ height: '195px', backgroundColor: 'beige' }}>
        {Array.from({ length: count }).map((_, index) => (
          <MyWayComponent key={index} index={index + 1} />
        ))}
      </div>
    </div>
  );
}

export default MyWayList;

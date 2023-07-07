import React, { useState } from 'react';
import './MyWayCSS.css';

const MyWayReqLogin = () => {
  return (
    <div>
          <div className="MyWayListTitle">
            <p>MyWay 목록</p>
            <div>UI 숨기기</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: '195px',
              backgroundColor: 'beige',
            }}
          >
            로그인 필요
          </div>
        </div>
  )
}

export default MyWayReqLogin;
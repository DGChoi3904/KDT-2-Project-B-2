import React from 'react';
import './Main.css';

function MyWayList() {
  return (
    <div>
      <div className='MyWayListTitle'>
        <p>
          MyWay 목록
        </p>
        <div>
          UI 숨기기
        </div>
      </div>
      <div style={{height: '195px', backgroundColor: 'beige'}}>
        조건부 렌더링을 통해 목록을 표시 & 숨김
      </div>
    </div>
  )
}


export default MyWayList;
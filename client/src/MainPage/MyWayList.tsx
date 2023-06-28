import React from 'react';

const MyWayListTitle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px 20px',
  height: '60px',
}


function MyWayList() {
  return (
    <div>
      <div style={MyWayListTitle}>
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
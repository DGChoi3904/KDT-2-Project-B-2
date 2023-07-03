import React from 'react';
import './Main.css';

interface MyWayComponentProps {
  index: number;
}

const MyWayComponent: React.FC<MyWayComponentProps> = ({ index }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <p style={{ flexGrow: '1' }}>#{index}</p>
      <p style={{ flexGrow: '5' }}>저장된 MyWay 경로 명</p>
      <button style={{ flexGrow: '2' }}>보기</button>
    </div>
  );
};

export default MyWayComponent;

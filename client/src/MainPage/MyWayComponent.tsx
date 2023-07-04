import React from 'react';
import './Main.css';
import globalVar from './Global';

type MySavedWay = {
  WayName: string;
  start: [number, number];
  end: [number, number];
  wayPoints: number[];
};

interface MyWayComponentProps {
  mySavedWay: MySavedWay;
  index: number;
}

const MyWayComponent: React.FC<MyWayComponentProps> = ({
  mySavedWay,
  index,
}) => {
  function handleButtonClick() {
    globalVar.startPoint = mySavedWay.start;
    globalVar.endPoint = mySavedWay.end;
    globalVar.wayPoint = mySavedWay.wayPoints;
    globalVar.isSearchingSavedWay = !globalVar.isSearchingSavedWay;
  }
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
      <p style={{ flexGrow: '5' }}>{mySavedWay.WayName}</p>
      <button style={{ flexGrow: '2' }} onClick={handleButtonClick}>
        보기
      </button>
    </div>
  );
};

export default MyWayComponent;

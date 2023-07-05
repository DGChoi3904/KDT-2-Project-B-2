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
  onMyButtonClick: () => void;
  handleCurrentMyWayNameObj: (index: number, myWayName: string) => void;
}

const MyWayComponent: React.FC<MyWayComponentProps> = ({
  mySavedWay,
  index,
  onMyButtonClick,
  handleCurrentMyWayNameObj,
}) => {
  function handleButtonClick() {
    //전역변수에 입력, 검색을 실행하려 하나, KakaoMap에서 인식하지 못함. 데이터 입력방법에 수정이 필요하다.
    globalVar.startPoint = mySavedWay.start;
    globalVar.endPoint = mySavedWay.end;
    globalVar.wayPoint = mySavedWay.wayPoints;
    handleCurrentMyWayNameObj(index, mySavedWay.WayName);
    onMyButtonClick();
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

import React from 'react';
import './MyWayCSS.css';

import MyWayComponent from './MyWayComponent';
interface MyWay {
  WayName: string;
  start: string;
  wayPoints: string[];
  end: string;
}
type myWayDataResult = any;

type myWayDataResultandEventProps = {
  myWayDataResult: myWayDataResult;
  onMyButtonClick: () => void;
  setCurrentMyWayNameObj: (myWayNameObj: {
    index: number;
    name: string;
  }) => void;
};

const MyWayList: React.FC<myWayDataResultandEventProps> = ({
  myWayDataResult,
  onMyButtonClick,
  setCurrentMyWayNameObj,
}) => {
  const userDbSample: MyWay[] = [
    {
      WayName: '장보고 오는 길',
      start: '36.378778859662745,127.3253416274792',
      wayPoints: ['36.375233842244825,127.38137482509418'],
      end: '36.34926776227329,127.3776809108991',
    },
    {
      WayName: '백화점 탐방 길',
      start: '36.322523526532486,127.40338689348418',
      wayPoints: ['36.35181184574371,127.37817317154799'],
      end: '36.37414016449389,127.31788135939522',
    },
  ];
  function parseYXFromXYString(xyString: string): [number, number] {
    const xyStringArr = xyString.split(',');
    let yxNumberArr: [number, number] = [0, 0];
    xyStringArr.forEach((yxValue: string, index: number) => {
      yxNumberArr[index] = Number.parseFloat(yxValue);
    });
    return yxNumberArr;
  }
  function handleCurrentMyWayNameObj(index: number, myWayName: string) {
    const myWayNameObj = { index: index + 1, name: myWayName };
    setCurrentMyWayNameObj(myWayNameObj);
  }
  const ways = userDbSample.map((way) => {
    let wayName: string = way.WayName;

    let wayStart: [number, number] = parseYXFromXYString(way.start);
    let wayEnd: [number, number] = parseYXFromXYString(way.end);
    let wayPointsArr: Array<number[]> = way.wayPoints.map((point: string) => {
      return parseYXFromXYString(point);
    });
    let wayPoints: number[] = [];
    wayPointsArr.forEach((value) => {
      wayPoints.push(...value);
    });
    return {
      WayName: wayName,
      start: wayStart,
      end: wayEnd,
      wayPoints: wayPoints,
    };
  });
  return (
    <div>
      <div className="MyWayListTitle">
        <p>MyWay 목록</p>
        <div>UI 숨기기</div>
      </div>
      <div style={{ minHeight: '195px', backgroundColor: 'beige' }}>
        {ways.map((mySavedWay, index) => (
          <MyWayComponent
            key={index}
            index={index + 1}
            mySavedWay={mySavedWay}
            onMyButtonClick={onMyButtonClick}
            handleCurrentMyWayNameObj={handleCurrentMyWayNameObj}
          />
        ))}
      </div>
    </div>
  );
};

export default MyWayList;

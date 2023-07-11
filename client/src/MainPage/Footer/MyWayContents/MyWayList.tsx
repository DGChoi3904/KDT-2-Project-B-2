import React, { useState, useEffect } from 'react';
import MyWayComponent from './MyWayComponent';
import { getCookie } from '../../../util/cookies';
import { loadWayPoint } from '../../../util/loadWayObj';

import '../MyWayCSS.css';

interface MyWay {
  WayName: string;
  start: string;
  wayPoints: string[];
  end: string;
}

interface MyWayData {
  end: string;
  start: string;
  userId: string;
  wayName: string;
  wayPoints: string[];
  __v: number;
  _id: string;
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

  const [userData, setUserData] = useState<MyWayData[]>([]);
  const [wayData, setWayData] = useState<boolean>(false);

  // 쿠키에서 로그인 중인 userId를 가져옴
  const cookieUserId = getCookie('userId');

  // userId를 이용해서 DB에 데이터를 요청
  const userDBData = async () => {
    try {
      const loadDataResult = loadWayPoint(cookieUserId);
      console.log(await loadDataResult)
      setUserData(await loadDataResult as MyWayData[])
    } catch (error) {
      console.error('데이터 가져오기 실패', error)
    }
  }

  // 최초 렌더링시 userDBData 함수 실행
  useEffect(() => {
    userDBData();
  }, [])

  // test용 useEffect
  useEffect(() => {
    console.log('userData값: ', userData)
  }, [userData])

  // const userDbSample: MyWayData[] = userData;

  function parseYXFromXYString(xyString: string): [number, number] {
    const xyStringArr = xyString.split(', ');
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

  const ways = userData.map((way) => {
    let wayName: string = way.wayName;

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

  // if (userData !== null) {
  // }
  

  return (
    <div>
      <div style={{ minHeight: '195px', backgroundColor: 'beige' }}>
        {(userData.length === 0) ? <div>저장된 경로가 없습니다</div> : ways.map((mySavedWay, index) => (
          <MyWayComponent
            key={index}
            index={index + 1}
            mySavedWay={mySavedWay}
            onMyButtonClick={onMyButtonClick}
            handleCurrentMyWayNameObj={handleCurrentMyWayNameObj}
          />
        ))}
        {/* {ways.map((mySavedWay, index) => (
          <MyWayComponent
            key={index}
            index={index + 1}
            mySavedWay={mySavedWay}
            onMyButtonClick={onMyButtonClick}
            handleCurrentMyWayNameObj={handleCurrentMyWayNameObj}
          />
        ))} */}
      </div>
    </div>
  );
};

export default MyWayList;

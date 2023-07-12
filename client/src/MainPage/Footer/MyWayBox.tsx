import React, { useState, useEffect } from 'react';

import MyWayTitle from './MyWayTitle/MyWayTitle';
import MyWayDetail from './MyWayContents/MyWayDetail';
import MyWayList from './MyWayContents/MyWayList';
import MyWayReqLogin from './MyWayContents/MyWayReqLogin';
import { getCookie } from '../../util/cookies';

type MyWayBoxProps = {
  detail: boolean;
  login: boolean;
  myWayDataResult: any;
  setNaviSearchCounter: React.Dispatch<React.SetStateAction<number>>;
  startNaviSearch: () => void;
  currentMyWayNameObj: {
    index: number;
    name: string;
  };
  setCurrentMyWayNameObj: (myWayNameObj: {
    index: number;
    name: string;
  }) => void;
  naviDataResult: any;
  myWayUI: boolean;
  setMyWayUI: React.Dispatch<React.SetStateAction<boolean>>;
};

const MyWayBox: React.FC<MyWayBoxProps> = ({
  detail,
  login,
  myWayDataResult,
  startNaviSearch,
  currentMyWayNameObj,
  setCurrentMyWayNameObj,
  naviDataResult,
  myWayUI,
  setMyWayUI,
}) => {
  const [loginState, setLoginState] = useState(false);
  useEffect(() => {
    const nickname = getCookie('nickname');
    if (nickname) {
      setLoginState(true);
    }
    console.log('loginState: ', loginState);
  }, [loginState]);
  console.log('loginState2: ', loginState);
  console.log('login: ', login);
  return (
    <div>
      <MyWayTitle
        myWayUI={myWayUI}
        currentMyWayNameObj={currentMyWayNameObj}
        setMyWayUI={setMyWayUI}
      />
      {login || loginState ? (
        detail ? (
          <MyWayDetail
            naviDataResult={naviDataResult}
            currentMyWayNameObj={currentMyWayNameObj}
          />
        ) : (
          <MyWayList
            myWayDataResult={myWayDataResult}
            onMyButtonClick={startNaviSearch}
            setCurrentMyWayNameObj={setCurrentMyWayNameObj}
          />
        )
      ) : (
        <MyWayReqLogin />
      )}
    </div>
  );
};

export default MyWayBox;

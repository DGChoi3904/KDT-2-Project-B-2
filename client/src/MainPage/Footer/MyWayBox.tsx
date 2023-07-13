import React, { useState, useEffect, useContext } from 'react';

import MyWayTitle from './MyWayTitle/MyWayTitle';
import MyWayDetail from './MyWayContents/MyWayDetail';
import MyWayList from './MyWayContents/MyWayList';
import MyWayReqLogin from './MyWayContents/MyWayReqLogin';
import { getCookie } from '../../util/cookies';
import { LoginContext } from '../../util/LoginContext';
import { MyWayContext } from '../../util/LoginContext';

type MyWayBoxProps = {
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
};

const MyWayBox: React.FC<MyWayBoxProps> = ({
  myWayDataResult,
  startNaviSearch,
  currentMyWayNameObj,
  setCurrentMyWayNameObj,
  naviDataResult,
}) => {
  const { loginCheck } = useContext(LoginContext);
  const { detail } = useContext(MyWayContext);
  const [loginState, setLoginState] = useState(false);
  useEffect(() => {
    const nickname = getCookie('nickname');
    if (nickname) {
      setLoginState(true);
    }
    console.log('loginState: ', loginState);
    console.log('detail값: ', detail);
  }, [loginState]);
  console.log('loginState2: ', loginState);
  console.log('login: ', loginCheck);
  console.log('detail2 값: ', detail);
  return (
    <div>
      <MyWayTitle
        currentMyWayNameObj={currentMyWayNameObj}
      />
      {loginCheck || loginState ? (
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

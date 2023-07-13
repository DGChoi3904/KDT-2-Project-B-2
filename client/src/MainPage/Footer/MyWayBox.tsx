import React, { useState, useEffect, useContext } from 'react';

import MyWayTitle from './MyWayTitle/MyWayTitle';
import MyWayDetail from './MyWayContents/MyWayDetail';
import MyWayList from './MyWayContents/MyWayList';
import MyWayReqLogin from './MyWayContents/MyWayReqLogin';
import { getCookie } from '../../util/cookies';
import { LoginContext } from '../../util/LoginContext';
import { MyWayContext } from '../../util/LoginContext';

type MyWayBoxProps = {
  setNaviSearchCounter: React.Dispatch<React.SetStateAction<number>>;
  startNaviSearch: () => void;
  naviDataResult: any;
};

const MyWayBox: React.FC<MyWayBoxProps> = ({
  startNaviSearch,
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
  }, [loginState]);
  console.log('loginState2: ', loginState);
  console.log('login: ', loginCheck);
  console.log('detail2 값: ', detail);
  return (
    <div>
      <MyWayTitle/>
      {loginCheck || loginState ? (
        detail ? (
          <MyWayDetail
            naviDataResult={naviDataResult}
          />
        ) : (
          <MyWayList
            onMyButtonClick={startNaviSearch}
          />
        )
      ) : (
        <MyWayReqLogin />
      )}
    </div>
  );
};

export default MyWayBox;

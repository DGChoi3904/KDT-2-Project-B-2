import React, { useState, useEffect, useContext } from 'react';

import MyWayTitle from './MyWayTitle/MyWayTitle';
import MyWayDetail from './MyWayContents/MyWayDetail';
import MyWayList from './MyWayContents/MyWayList';
import MyWayReqLogin from './MyWayContents/MyWayReqLogin';
import { getCookie } from '../../util/cookies';
import { LoginContext, MyWayContext } from '../../util/LoginContext';
import { NaviContext } from '../../util/MapContext';

const MyWayBox: React.FC = () => {
  const { loginCheck } = useContext(LoginContext);
  const { detail } = useContext(MyWayContext);
  const { naviSearchCounter, startNaviSearch } = useContext(NaviContext)

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
          <MyWayDetail/>
        ) : (
          <MyWayList
            onMyButtonClick={() => startNaviSearch(naviSearchCounter)}
          />
        )
      ) : (
        <MyWayReqLogin />
      )}
    </div>
  );
};

export default MyWayBox;

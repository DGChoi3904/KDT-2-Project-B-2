import React, { useState, useEffect } from 'react';

import MyWayTitle from './MyWayTitle/MyWayTitle';
import MyWayDetail from './MyWayContents/MyWayDetail';
import MyWayList from './MyWayContents/MyWayList';
import MyWayReqLogin from './MyWayContents/MyWayReqLogin';
import { getCookie } from '../../util/cookies';

type MyWayBoxProps = {
  detail: boolean;
};
const MyWayBox: React.FC<MyWayBoxProps> = ({ detail }) => {
  const [loginState, setLoginState] = useState(false);
  useEffect(() => {
    const nickname = getCookie('nickname');
    if (nickname) {
      setLoginState(true);
    }
  }, []);
  return (
    <div>
      {/* {loginState ? <MyWayTitle /> : <MyWayReqLogin />} */}
      <MyWayTitle /> <MyWayReqLogin />
    </div>
  );
};

export default MyWayBox;

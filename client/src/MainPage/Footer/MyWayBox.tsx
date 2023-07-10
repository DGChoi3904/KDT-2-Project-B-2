import React from 'react';

import MyWayTitle from './MyWayTitle/MyWayTitle';
import MyWayDetail from './MyWayContents/MyWayDetail';
import MyWayList from './MyWayContents/MyWayList';
import MyWayReqLogin from './MyWayContents/MyWayReqLogin';

type MyWayBoxProps = {
  detail: boolean;
  login: boolean;
  myWayDataResult: any;
}

const MyWayBox: React.FC<MyWayBoxProps> = ({detail, login, myWayDataResult}) => {
  return (
    <div>
      <MyWayTitle />
      {login ? <MyWayList
      myWayDataResult={myWayDataResult}
      onMyButtonClick={startNaviSearch}
      setCurrentMyWayNameObj={setCurrentMyWayNameObj}
      /> : <MyWayReqLogin/>}

    </div>
  )
}

export default MyWayBox;
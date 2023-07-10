import React from 'react';

import MyWayTitle from './MyWayTitle/MyWayTitle';
import MyWayDetail from './MyWayContents/MyWayDetail';
import MyWayList from './MyWayContents/MyWayList';
import MyWayReqLogin from './MyWayContents/MyWayReqLogin';

type MyWayBoxProps = {
  detail: boolean;
}

const MyWayBox: React.FC<MyWayBoxProps> = ({detail}) => {
  return (
    <div>
      <MyWayTitle />
      <MyWayReqLogin/>
    </div>
  )
}

export default MyWayBox;
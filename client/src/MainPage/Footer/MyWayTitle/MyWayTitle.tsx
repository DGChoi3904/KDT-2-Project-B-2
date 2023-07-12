import React, { useEffect, useState } from 'react';
import '../MyWayCSS.css';

type MyWayTitleProps = {
  myWayUI: boolean;
  setMyWayUI: React.Dispatch<React.SetStateAction<boolean>>;
  currentMyWayNameObj: {
    index: number;
    name: string;
  };
  detail: boolean;
};

const MyWayTitle: React.FC<MyWayTitleProps> = ({
  myWayUI,
  setMyWayUI,
  currentMyWayNameObj,
  detail,
}) => {
  const handleUIHidden = () => {
    setMyWayUI(false);
  };

  const handleUIShow = () => {
    setMyWayUI(true);
  };
  useEffect(() => {
    console.log(currentMyWayNameObj);
  }, [currentMyWayNameObj.index]);

  return (
    <div className="MyWayListTitle">
      {detail ? (
        currentMyWayNameObj.index === 0 ? (
          <p>검색 결과</p>
        ) : (
          <p>
            #{currentMyWayNameObj.index - 1}-{currentMyWayNameObj.name}
          </p>
        )
      ) : (
        <p>MyWay 목록</p>
      )}
      {myWayUI ? (
        <button onClick={handleUIHidden}>UI 숨기기</button>
      ) : (
        <button onClick={handleUIShow}>UI 보이기</button>
      )}
    </div>
  );
};

export default MyWayTitle;

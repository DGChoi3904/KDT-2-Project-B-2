import React, { useEffect, useState, useContext } from 'react';
import { MyWayContext } from '../../../util/LoginContext';
import '../MyWayCSS.css';

const MyWayTitle: React.FC = () => {
  const { myWayUI, setMyWayUI, detail, setDetail, currentMyWayNameObj } = useContext(MyWayContext)

  const handleUIHidden = () => {
    console.log(myWayUI)
    setMyWayUI(false);
  };

  const handleUIShow = () => {
    console.log(myWayUI)
    setMyWayUI(true);
  };
  const handleDetail = () => {
    setDetail(false);
  };

  useEffect(() => {
    console.log(currentMyWayNameObj);
  }, [currentMyWayNameObj.index]);
  useEffect(() => {
    console.log(`${detail} 은 Detail의 값입니다.`);
  }, [detail]);

  return (
    <div className="MyWayListTitle">
      {detail ? (
        currentMyWayNameObj.index === 0 ? (
          <>
            <button
              className="myway-title-return-button"
              type="button"
              onClick={handleDetail}
            >
              &#x3008;
            </button>
            <p>검색 결과</p>
          </>
        ) : (
          <>
            <button
              className="myway-title-return-button"
              type="button"
              onClick={handleDetail}
            >
              &#x3008;
            </button>
            <p>
              #{currentMyWayNameObj.index - 1}-{currentMyWayNameObj.name}
            </p>
          </>
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

import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import MainPage from './MainPage/MainPage';
import Loading from './LoadingPage/LoadingPage';
import SignUp from './SignupPage/SignUp';

import { MapContext, NaviProvider } from "./util/MapContext";
import { LoginContextProvider, MyWayContext } from "./util/LoginContext";

interface MyWayNameObj {
  index: number;
  name: string;
}

function App() {
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_API_KEY}&libraries=services`;
    script.async = true;
    script.onload = () => {
      setTimeout(() => {setApiLoaded(true)}, 1500);
      // setApiLoaded(true);
    };
    document.body.appendChild(script);
    console.log(process.env.REACT_APP_API_KEY);
  }, []);

  const [startPoint, setStartPoint] = useState<[number, number]>([0, 0]);
  const [endPoint, setEndPoint] = useState<[number, number]>([0, 0]);
  const [wayPoint, setWayPoint] = useState<number[]>([]);
  const [isSearchingStart, setIsSearchingStart] = useState<boolean>(false);
  const [isSearchingEnd, setIsSearchingEnd] = useState<boolean>(false);

  // 로그인 상태 유지를 위해 localStorage 사용
  const [loginCheck, setLoginCheck] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('loginCheck');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [myWayUI, setMyWayUI] = useState<boolean>(true);
  const [detail, setDetail] = useState<boolean>(false);
  const [currentMyWayNameObj, setCurrentMyWayNameObj] = useState<MyWayNameObj>({
    index: 0,
    name: '',
  })

  useEffect(() => {
    localStorage.setItem('loginCheck', JSON.stringify(loginCheck));
    console.log('login체커: ', loginCheck);
  }, [loginCheck]);

  if (!apiLoaded) {
    // API 스크립트가 로드되지 않은 경우 로딩 표시 등을 표시할 수 있습니다.
    return <div><Loading /></div>;
  } else {
    return (
      <div>
        <MapContext.Provider value={{ startPoint, setStartPoint, endPoint, setEndPoint, wayPoint, setWayPoint, isSearchingStart, setIsSearchingStart, isSearchingEnd, setIsSearchingEnd }}>
          <LoginContextProvider>
            <NaviProvider>
            <MyWayContext.Provider value={{myWayUI, setMyWayUI, detail, setDetail, currentMyWayNameObj, setCurrentMyWayNameObj}}>
              <Routes>
                <Route path="/" element={<Loading />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </MyWayContext.Provider>
            </NaviProvider>
          </LoginContextProvider>
        </MapContext.Provider>
      </div>
    )
  }
}

export default App;
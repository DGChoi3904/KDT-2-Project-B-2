import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import MainPage from './MainPage/MainPage';
import Loading from './LoadingPage/LoadingPage';
import SignUp from './SignupPage/SignUp';

import { MapContext } from "./util/MapContext";
import { LoginContextProvider, MyWayContext } from "./util/LoginContext";

interface MyWayNameObj {
  index: number;
  name: string;
}

function App() {
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
    console.log('로그인 상태 체크: ', loginCheck)
    console.log('로그인 상태 체크22: ', localStorage.getItem('loginCheck'))
  }, [])

  useEffect(() => {
    localStorage.setItem('loginCheck', JSON.stringify(loginCheck));
    console.log('login체커: ', loginCheck);
  }, [loginCheck]);

  return (
    <div>
      <MapContext.Provider value={{ startPoint, setStartPoint, endPoint, setEndPoint, wayPoint, setWayPoint, isSearchingStart, setIsSearchingStart, isSearchingEnd, setIsSearchingEnd }}>
        <LoginContextProvider>
          <MyWayContext.Provider value={{myWayUI, setMyWayUI, detail, setDetail, currentMyWayNameObj, setCurrentMyWayNameObj}}>
          <Routes>
            <Route path="/" element={<Loading />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          </MyWayContext.Provider>
        </LoginContextProvider>
      </MapContext.Provider>
    </div>
  )
}

export default App;
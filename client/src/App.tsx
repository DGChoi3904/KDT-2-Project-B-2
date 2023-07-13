import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import MainPage from './MainPage/MainPage';
import Loading from './LoadingPage/LoadingPage';
import SignUp from './SignupPage/SignUp';

import { MapContext } from "./util/MapContext";
import { LoginContext } from "./util/LoginContext";

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

  useEffect(() => {
    localStorage.setItem('loginCheck', JSON.stringify(loginCheck));
    console.log('login체커: ', loginCheck);
  }, [loginCheck]);

  return (
    <div>
      <MapContext.Provider value={{ startPoint, setStartPoint, endPoint, setEndPoint, wayPoint, setWayPoint, isSearchingStart, setIsSearchingStart, isSearchingEnd, setIsSearchingEnd }}>
        <LoginContext.Provider value ={{loginCheck, setLoginCheck}}>
          <Routes>
            <Route path="/" element={<Loading />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </LoginContext.Provider>
      </MapContext.Provider>
    </div>
  )
}

export default App;
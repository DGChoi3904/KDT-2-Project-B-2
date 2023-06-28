import React, { useEffect } from 'react';
import './Main.css';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

function KakaoMap() {

  useEffect(() => {
    const Container = document.getElementById('map'); // 지도를 표시할 div 
    const Options = { 
      center: new kakao.maps.LatLng(36.35, 127.385), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(Container, Options); 
  }, [])


  return(
    <div id='map' className='MapNormalSize'></div>
  )
}

export default KakaoMap;
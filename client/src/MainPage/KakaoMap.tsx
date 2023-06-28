import React, { useEffect } from 'react'; 

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
    <div id='map' style={{width: '430px', height: '500px'}}></div>
  )
}

export default KakaoMap;
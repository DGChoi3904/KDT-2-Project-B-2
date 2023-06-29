import React, { useEffect, useState } from 'react';
import './Main.css';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

function KakaoMap() {
  const [startPath, setStartPath] = useState(['']);

  useEffect(() => {
    const Container = document.getElementById('map');
    const Options = {
      center: new kakao.maps.LatLng(36.35, 127.385), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(Container, Options);

    // 출발지와 목적지 좌표 설정
    const startLatLng = new kakao.maps.LatLng(
      36.349267414162014,
      127.37761406703146,
    );
    const endLatLng = new kakao.maps.LatLng(
      36.35620266001714,
      127.38198227349935,
    );

    // 출발지와 목적지 마커 생성
    const startMarker = new kakao.maps.Marker({ position: startLatLng });
    const endMarker = new kakao.maps.Marker({ position: endLatLng });
    startMarker.setMap(map);
    endMarker.setMap(map);

    // 경로  표현
    const path = new kakao.maps.Polyline({
      path: [startLatLng, endLatLng],
      strokeWeight: 5,
      strokeColor: '#2E64FE', // 파란색
      strokeOpacity: 0.7,
      strokeStyle: 'solid',
    });
    path.setMap(map);
  }, []);

  return (
    <div>
      <div id="map" className="MapNormalSize"></div>
      <div id="result"></div>
    </div>
  );
}

export default KakaoMap;

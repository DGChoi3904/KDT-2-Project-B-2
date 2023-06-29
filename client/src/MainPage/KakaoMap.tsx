import React, { useEffect, useState } from 'react';
import './Main.css';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

function KakaoMap() {
  const [startpath, setStartPath] = useState(['']);
  useEffect(() => {
    const Container = document.getElementById('map'); // 지도를 표시할 div
    const Options = {
      center: new kakao.maps.LatLng(36.35, 127.385), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(Container, Options);

    kakao.maps.event.addListener(
      map,
      'click',
      function (mouseEvent: { latLng: any }) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        var latlng = mouseEvent.latLng;

        var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';

        var resultDiv = document.getElementById('result')!;
        resultDiv.innerHTML = message;
      },
    );
  }, []);

  return (
    <div>
      <div id="map" className="MapNormalSize"></div>;<div id="result"></div>
    </div>
  );
}

export default KakaoMap;

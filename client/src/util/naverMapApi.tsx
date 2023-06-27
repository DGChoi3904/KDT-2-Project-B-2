import React, { useEffect } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

const NaverMapComponent = () => {
  useEffect(() => {
    const map = new window.naver.maps.Map('map', {
      center: new window.naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    });

    // 추가적인 지도 설정 또는 마커 등의 추가 기능 구현
    // ...

    return () => {
      // 컴포넌트 언마운트 시 지도 관련 리소스 정리
      // ...
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default NaverMapComponent;

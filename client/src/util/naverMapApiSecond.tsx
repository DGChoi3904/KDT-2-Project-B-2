import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

const NaverMapApi = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/scripts/maps.js';
    script.async = true;

    script.onload = () => {
      setIsScriptLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isScriptLoaded && window.naver) {
      const map = new window.naver.maps.Map('maps', {
        center: new window.naver.maps.LatLng(36.3501713, 127.3848386),
        zoom: 20,
      });

      // 추가적인 지도 설정 또는 마커 등의 추가 기능 구현
      // ...
    }
  }, [isScriptLoaded]);

  return (
    <div>
      {isScriptLoaded ? (
        <div id="maps" style={{ width: '100%', height: '400px' }}></div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default NaverMapApi;

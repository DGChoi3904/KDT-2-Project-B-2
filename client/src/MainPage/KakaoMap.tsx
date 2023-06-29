import React, { useEffect, useState } from 'react';
import './Main.css';

declare global {
  interface Window {
    kakao: any;
  }
}
interface KakaoMapProps {
  isSearchingStart: boolean;
  setIsSearchingStart: (value: boolean) => void;
}

const { kakao } = window;

function KakaoMap({ isSearchingStart, setIsSearchingStart }: KakaoMapProps) {
  const [startPoint, setStartPoint] = useState([]);
  const [endPoint, setEndPoint] = useState([]);
  useEffect(() => {
    const Container = document.getElementById('map'); // 지도를 표시할 div
    const Options = {
      center: new kakao.maps.LatLng(36.35, 127.385), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    const map = new kakao.maps.Map(Container, Options);

    function searchDetailAddrFromCoords(
      coords: { getLng: any; getLat: any },
      callback: Function,
    ) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
    function onClickSetStartPoint(mouseEvent: { latLng: any }) {
      searchDetailAddrFromCoords(
        mouseEvent.latLng,
        function (result: any, status: any) {
          if (status === kakao.maps.services.Status.OK) {
            var detailAddr = !!result[0].road_address
              ? '<div>도로명주소 : ' +
                result[0].road_address.address_name +
                '</div>'
              : '';
            detailAddr +=
              '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

            var content =
              '<div class="StartAddr">' +
              '<span class="title">출발지 주소 정보</span>' +
              detailAddr +
              '</div>';

            // 마커를 클릭한 위치에 표시합니다
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker);
            setIsSearchingStart(false);
          }
        },
      );
    }

    if (isSearchingStart) {
      kakao.maps.event.addListener(map, 'click', onClickSetStartPoint);
    }
    return () => {
      kakao.maps.event.removeListener(map, 'click', onClickSetStartPoint);
    };
  }, []);

  return (
    <div>
      <div id="map" className="MapNormalSize"></div>;<div id="result"></div>
    </div>
  );
}

export default KakaoMap;

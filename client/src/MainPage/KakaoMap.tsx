import React, { useEffect, useState } from 'react';
import './Main.css';
import globalVar from './Global';

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
      level: 3, // 지도의 확대 레벨
    };

    // 주소-좌표 변환 객체를 생성
    var geocoder = new kakao.maps.services.Geocoder();

    var startMarker = new kakao.maps.Marker(), // 출발지 위치를 표시할 마커.
      startInfowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 출발지에 대한 주소를 표시할 인포윈도우
    var endMarker = new kakao.maps.Marker(), // 목적지 위치를 표시할 마커.
      endInfowindow = new kakao.maps.InfoWindow({ zindex: 6 }); // 목적지에 대한 주소를 표시할 인포윈도우

    const map = new kakao.maps.Map(Container, Options);
    // 맵위의 클릭이벤트 리스너 파트.
    kakao.maps.event.addListener(
      map,
      'click',
      (mouseEvent: { latLng: any }) => {
        // latLng를 사용하는  클릭 이벤트를 쓸 경우, 이 아래에 기입할 것.

        // 전역변수 isSearchingStart가 True일 경우 실행되는 구문
        if (globalVar.isSearchingStart) {
          // 맵에서 출발지 마커를 찍어주는 함수 실행.
          onClickSetStartPoint(mouseEvent);
        } else if (globalVar.isSearchingEnd) {
          onClickSetEndPoint(mouseEvent);
        }
      },
    );
    // 좌표로 상세 주소 정보를 요청하는 콜백함수
    function searchDetailAddrFromCoords(
      coords: { getLng: any; getLat: any },
      callback: Function,
    ) {
      // geocoder를 통해 좌표로 상세 주소 정보를 요청
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
    // 맵을 클릭시 해당 좌표에 출발지 마커를 찍고 위치정보를 인포윈도우에 저장하는 함수
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
              '<div style="padding:5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">' +
              '<span class="title">출발지 주소 정보</span>' +
              detailAddr +
              '</div>';

            // 마커를 클릭한 위치에 표시
            startMarker.setPosition(mouseEvent.latLng);
            startMarker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 상세 주소정보를 표시
            startInfowindow.setContent(content);
            startInfowindow.open(map, startMarker);
            globalVar.startPoint = [
              mouseEvent.latLng.getLat(),
              mouseEvent.latLng.getLng(),
            ];
            console.log(globalVar.startPoint);

            // 출발지 지정 이후, 전역변수를 false로 설정.
            globalVar.isSearchingStart = false;
          }
        },
      );
    }
    // 맵을 클릭시 해당 좌표에 목적지 마커를 찍고 위치정보를 인포윈도우에 저장하는 함수
    function onClickSetEndPoint(mouseEvent: { latLng: any }) {
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
              '<div style="padding:5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">' +
              '<span class="title">목적지 주소 정보</span>' +
              detailAddr +
              '</div>';

            // 마커를 클릭한 위치에 표시
            endMarker.setPosition(mouseEvent.latLng);
            endMarker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 상세 주소정보를 표시
            endInfowindow.setContent(content);
            endInfowindow.open(map, endMarker);
            globalVar.endPoint = [
              mouseEvent.latLng.getLat(),
              mouseEvent.latLng.getLng(),
            ];
            console.log(globalVar.endPoint);

            // 목적지 지정 이후, 전역변수를 false로 설정.
            globalVar.isSearchingEnd = false;
          }
        },
      );
    }
  }, []);

  return (
    <div>
      <div id="map" className="MapNormalSize"></div>;<div id="result"></div>
    </div>
  );
}

export default KakaoMap;

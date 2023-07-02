import React, { useEffect, useState, useRef } from 'react';
import './Main.css';
import globalVar from './Global';

interface Place {
  id: string;
  name: string;
  x: number;
  y: number;
}

function KakaoMap() {
  const [keyword, setKeyword] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const [roadPath0, setRoadPath0] = useState<number[]>([]);
  const [roadPath1, setRoadPath1] = useState<number[]>([]);
  const [roadPath2, setRoadPath2] = useState<number[]>([]);
  const [roadPath3, setRoadPath3] = useState<number[]>([]);
  const [roadPath4, setRoadPath4] = useState<number[]>([]);
  const [roadPath6, setRoadPath6] = useState<number[]>([]);
  const [dataCheck, setDataCheck] = useState<boolean>(false);

  const mapRef = useRef<any>(null);

  let geocoder = new window.kakao.maps.services.Geocoder();

  let startMarker = new window.kakao.maps.Marker(), // 출발지 위치를 표시할 마커.
    startInfowindow = new window.kakao.maps.InfoWindow({ zindex: 1 }); // 출발지에 대한 주소를 표시할 인포윈도우
  let endMarker = new window.kakao.maps.Marker(), // 목적지 위치를 표시할 마커.
    endInfowindow = new window.kakao.maps.InfoWindow({ zindex: 6 }); // 목적지에 대한 주소를 표시할 인포윈도우

  // 지도 생성
  useEffect(() => {
    const Container = document.getElementById('map');
    const Options = {
      center: new window.kakao.maps.LatLng(36.35, 127.385),
      level: 3,
    };

    const map = new window.kakao.maps.Map(Container, Options);
    // map을 Ref값에 등록
    mapRef.current = map;

    const placesService = new window.kakao.maps.services.Places();
    const searchPlaces = (keyword: string) => {
      placesService.keywordSearch(keyword, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlaces(
            result.map((place: any) => ({
              id: place.id,
              name: place.place_name,
              x: place.x,
              y: place.y,
            })),
          );
        }
      });
    };

    const markerImage = new window.kakao.maps.MarkerImage(
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
      new window.kakao.maps.Size(64, 69),
    );
  }, []);

  function setClickEvents(mouseEvent: { latLng: any }) {
    // 맵을 클릭시 해당 좌표에 출발지 마커를 찍고 위치정보를 인포윈도우에 저장하는 함수
    function onClickSetStartPoint(mouseEvent: { latLng: any }) {
      searchDetailAddrFromCoords(
        mouseEvent.latLng,
        function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
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
            startMarker.setMap(mapRef.current);

            // 인포윈도우에 클릭한 위치에 대한 상세 주소정보를 표시
            window.kakao.maps.event.addListener(
              startMarker,
              'click',
              function () {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다

                startInfowindow.setContent(content);
                if (startInfowindow.getMap() === null) {
                  startInfowindow.open(mapRef.current, startMarker);
                } else {
                  startInfowindow.close();
                }
              },
            );
            globalVar.startPoint = [
              mouseEvent.latLng.getLat(),
              mouseEvent.latLng.getLng(),
            ];
            console.log(
              `출발지 좌표 : ${globalVar.startPoint}, 목적지 좌표 ${globalVar.endPoint}`,
            );

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
          if (status === window.kakao.maps.services.Status.OK) {
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
            endMarker.setMap(mapRef.current);

            // 인포윈도우에 클릭한 위치에 대한 상세 주소정보를 표시
            window.kakao.maps.event.addListener(
              endMarker,
              'click',
              function () {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                endInfowindow.setContent(content);
                if (endInfowindow.getMap() === null) {
                  endInfowindow.open(mapRef.current, endMarker);
                } else {
                  endInfowindow.close();
                }
              },
            );

            globalVar.endPoint = [
              mouseEvent.latLng.getLat(),
              mouseEvent.latLng.getLng(),
            ];
            console.log(
              `출발지 좌표 : ${globalVar.startPoint}, 목적지 좌표 ${globalVar.endPoint}`,
            );

            // 목적지 지정 이후, 전역변수를 false로 설정.
            globalVar.isSearchingEnd = false;
          }
        },
      );
    }

    // 좌표로 상세 주소 정보를 요청하는 콜백함수
    function searchDetailAddrFromCoords(
      coords: { getLng: any; getLat: any },
      callback: Function,
    ) {
      // geocoder를 통해 좌표로 상세 주소 정보를 요청
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    if (globalVar.isSearchingStart) {
      // 맵에서 출발지 마커를 찍어주는 함수 실행.
      onClickSetStartPoint(mouseEvent);
    } else if (globalVar.isSearchingEnd) {
      onClickSetEndPoint(mouseEvent);
    }
  }
  // 클릭 이벤트 분리
  useEffect(() => {
    window.kakao.maps.event.addListener(
      mapRef.current,
      'click',
      setClickEvents,
    );
  }, []);

  // polyline 그리기
  useEffect(() => {
    console.log('polyline 그리기');
    if (dataCheck === true && mapRef.current) {
      // path 데이터 저장용 빈 배열
      // 0: 정보 없음
      // 1: 정체
      // 2: 지체
      // 3: 서행
      // 4: 원활
      // 6: 교통사고(통행 불가)

      const linePaths = {
        0: { color: '#FFF6F4' },
        1: { color: '#C80000' },
        2: { color: '#F86F03' },
        3: { color: '#FEE500' },
        4: { color: '#2DB400' },
        6: { color: '#6B6E70' },
      }

      // linePath와 polyline을 객체로 만들어서 코드 줄일 필요가 있음
      const linePath0 = [];
      // roadPath의 데이터를 kakao.maps.LatLng() 메서드에 입력
      for (let i = 0; i < roadPath0.length; i = i + 2) {
        const lng = roadPath0[i];
        const lat = roadPath0[i + 1];
        const latlng = new window.kakao.maps.LatLng(lat, lng);
        linePath0.push(latlng);
      }

      const polyline0 = new window.kakao.maps.Polyline({
        path: linePath0,
        strokeWeight: 7,
        strokeColor: linePaths[0],
        strokeOpacity: 1,
        strokeStyle: 'solid',
      });

      const linePath1 = [];
      // roadPath의 데이터를 kakao.maps.LatLng() 메서드에 입력
      for (let i = 0; i < roadPath1.length; i = i + 2) {
        const lng = roadPath1[i];
        const lat = roadPath1[i + 1];
        const latlng = new window.kakao.maps.LatLng(lat, lng);
        linePath1.push(latlng);
      }

      const polyline1 = new window.kakao.maps.Polyline({
        path: linePath1,
        strokeWeight: 7,
        strokeColor: linePaths[1],
        strokeOpacity: 1,
        strokeStyle: 'solid',
      });

      const linePath2 = [];
      // roadPath의 데이터를 kakao.maps.LatLng() 메서드에 입력
      for (let i = 0; i < roadPath2.length; i = i + 2) {
        const lng = roadPath2[i];
        const lat = roadPath2[i + 1];
        const latlng = new window.kakao.maps.LatLng(lat, lng);
        linePath2.push(latlng);
      }

      const polyline2 = new window.kakao.maps.Polyline({
        path: linePath2,
        strokeWeight: 7,
        strokeColor: linePaths[0],
        strokeOpacity: 1,
        strokeStyle: 'solid',
      });

      const linePath3 = [];
      // roadPath의 데이터를 kakao.maps.LatLng() 메서드에 입력
      for (let i = 0; i < roadPath3.length; i = i + 2) {
        const lng = roadPath3[i];
        const lat = roadPath3[i + 1];
        const latlng = new window.kakao.maps.LatLng(lat, lng);
        linePath3.push(latlng);
      }

      const polyline3 = new window.kakao.maps.Polyline({
        path: linePath3,
        strokeWeight: 7,
        strokeColor: linePaths[3],
        strokeOpacity: 1,
        strokeStyle: 'solid',
      });

      const linePath4 = [];
      // roadPath의 데이터를 kakao.maps.LatLng() 메서드에 입력
      for (let i = 0; i < roadPath4.length; i = i + 2) {
        const lng = roadPath4[i];
        const lat = roadPath4[i + 1];
        const latlng = new window.kakao.maps.LatLng(lat, lng);
        linePath4.push(latlng);
      }

      const polyline4 = new window.kakao.maps.Polyline({
        path: linePath4,
        strokeWeight: 7,
        strokeColor: linePaths[4],
        strokeOpacity: 1,
        strokeStyle: 'solid',
      });

      const linePath6 = [];
      // roadPath의 데이터를 kakao.maps.LatLng() 메서드에 입력
      for (let i = 0; i < roadPath6.length; i = i + 2) {
        const lng = roadPath6[i];
        const lat = roadPath6[i + 1];
        const latlng = new window.kakao.maps.LatLng(lat, lng);
        linePath6.push(latlng);
      }

      const polyline6 = new window.kakao.maps.Polyline({
        path: linePath6,
        strokeWeight: 7,
        strokeColor: linePaths[6],
        strokeOpacity: 1,
        strokeStyle: 'solid',
      });

      polyline0.setMap(mapRef.current);
      polyline1.setMap(mapRef.current);
      polyline2.setMap(mapRef.current);
      polyline3.setMap(mapRef.current);
      polyline4.setMap(mapRef.current);
      polyline6.setMap(mapRef.current);
    }
  }, [dataCheck, roadPath0, roadPath1, roadPath2, roadPath3, roadPath4, roadPath6]);

  // 경로안내 버튼 클릭 시 지정된 출발지/도착지 정보를 가지고 최단거리 산출
  const handleNavi = () => {
    const url = `https://apis-navi.kakaomobility.com/v1/directions?priority=RECOMMEND&car_type=1&car_fuel=GASOLINE&origin=${globalVar.startPoint[1]}%2C+${globalVar.startPoint[0]}&destination=${globalVar.endPoint[1]}%2C+${globalVar.endPoint[0]}`;
    console.log('url: ', url);

    const headers = {
      Authorization: 'KakaoAK 0f6a05d1d1d9ce7b4b2d324b0e39f02d',
    };
    // fetch를 통해 카카오 네비 API에 요청을 보냄
    fetch(url, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((jsonData) => {
        // 요청에 대한 처리
        console.log('응답 : ', jsonData);

        // 응답 데이터에서 roads 데이터만 추출
        const roadData = jsonData['routes'][0]['sections'][0]['roads'];
        console.log('roadData : ', roadData);

        // roads 데이터에서 반복문을 통해 Node 좌표 추출
        const NodeData0: number[] = [];
        const NodeData1: number[] = [];
        const NodeData2: number[] = [];
        const NodeData3: number[] = [];
        const NodeData4: number[] = [];
        const NodeData6: number[] = [];
        for(let a = 0; a < jsonData['routes'][0]['sections'].length; a++) {
          for(let i = 0; i < jsonData['routes'][0]['sections'][a]['roads'].length; i++) {
            for(let j = 0; j < jsonData['routes'][0]['sections'][a]['roads'][i]['vertexes'].length; j++) {
              // Node 좌표를 도로 상황에 따라 각각의 RoadPath에 저장
              switch(jsonData['routes'][0]['sections'][a]['roads'][i]['traffic_state']) {
                case 0:
                  NodeData0.push(jsonData['routes'][0]['sections'][a]['roads'][i]['vertexes'][j]);
                  setRoadPath0(NodeData0);
                  break;
                case 1:
                  NodeData1.push(jsonData['routes'][0]['sections'][a]['roads'][i]['vertexes'][j]);
                  setRoadPath1(NodeData1);
                  break;
                case 2:
                  NodeData2.push(jsonData['routes'][0]['sections'][a]['roads'][i]['vertexes'][j]);
                  setRoadPath2(NodeData2);
                  break;
                case 3:
                  NodeData3.push(jsonData['routes'][0]['sections'][a]['roads'][i]['vertexes'][j]);
                  setRoadPath3(NodeData3);
                  break;
                case 4:
                  NodeData4.push(jsonData['routes'][0]['sections'][a]['roads'][i]['vertexes'][j]);
                  setRoadPath4(NodeData4);
                  break;
                case 6:
                  NodeData6.push(jsonData['routes'][0]['sections'][a]['roads'][i]['vertexes'][j]);
                  setRoadPath6(NodeData6);
                  break;
              }
            }
          }
        }
        setDataCheck(true);
      })
      .catch((error) => {
        // 오류 처리
        console.error(error);
      });
  };

  const handleSearch = () => {
    const placesService = new window.kakao.maps.services.Places();
    placesService.keywordSearch(keyword, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(
          result.map((place: any) => ({
            id: place.id,
            name: place.place_name,
            x: place.x,
            y: place.y,
          })),
        );

        if (mapRef.current && result.length > 0) {
          const firstPlace = result[0];
          const firstPlacePosition = new window.kakao.maps.LatLng(
            firstPlace.y,
            firstPlace.x,
          );
          mapRef.current.setCenter(firstPlacePosition);
        }
      }
    });
  };

  return (
    <div>
      <div id="map" className="MapNormalSize"></div>
      <div id="result"></div>
      <div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {/* <button onClick={handleNaviStart}>출발지 설정</button> */}
      {/* <button onClick={handleNaviEnd}>목적지 설정</button> */}
      <button onClick={handleNavi}>경로 안내</button>
    </div>
  );
}

export default KakaoMap;

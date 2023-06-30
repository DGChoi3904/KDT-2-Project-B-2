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

  const [startPath, setStartPath] = useState<string[]>([]);
  const [endPath, setEndPath] = useState<string[]>([]);
  const [roadPath, setRoadPath] = useState<number[]>([]);
  const [dataCheck, setDataCheck] = useState<boolean>(false);
  const mapRef = useRef<any>(null);

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
    // 주소-좌표 변환 객체를 생성
    let geocoder = new window.kakao.maps.services.Geocoder();

    let startMarker = new window.kakao.maps.Marker(), // 출발지 위치를 표시할 마커.
      startInfowindow = new window.kakao.maps.InfoWindow({ zindex: 1 }); // 출발지에 대한 주소를 표시할 인포윈도우
    let endMarker = new window.kakao.maps.Marker(), // 목적지 위치를 표시할 마커.
      endInfowindow = new window.kakao.maps.InfoWindow({ zindex: 6 }); // 목적지에 대한 주소를 표시할 인포윈도우

    // 맵위의 클릭이벤트 리스너 파트.
    window.kakao.maps.event.addListener(
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
            startMarker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 상세 주소정보를 표시
            startInfowindow.setContent(content);
            startInfowindow.open(map, startMarker);
            globalVar.startPoint = [
              mouseEvent.latLng.getLat(),
              mouseEvent.latLng.getLng(),
            ];
            console.log(`출발지 좌표 : ${globalVar.startPoint}, 목적지 좌표 ${globalVar.endPoint}`);

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
            endMarker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 상세 주소정보를 표시
            endInfowindow.setContent(content);
            endInfowindow.open(map, endMarker);
            globalVar.endPoint = [
              mouseEvent.latLng.getLat(),
              mouseEvent.latLng.getLng(),
            ];
            console.log(`출발지 좌표 : ${globalVar.startPoint}, 목적지 좌표 ${globalVar.endPoint}`);

            // 목적지 지정 이후, 전역변수를 false로 설정.
            globalVar.isSearchingEnd = false;
          }
        },
      );
    }

    // 임시로 직접 클릭으로 좌표 지정 기능 살려 둠 //
    window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: { latLng: any }) {
      const latlng = mouseEvent.latLng;

      if (startPath.length === 0) {
        setStartPath([latlng.getLat(), latlng.getLng()]);
      } else {
        setEndPath([latlng.getLat(), latlng.getLng()]);
      }

      const message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, 경도는 ' + latlng.getLng() + ' 입니다';
      const resultDiv = document.getElementById('result')!;
      resultDiv.innerHTML = message;
      
    });
    // 임시로 직접 클릭으로 좌표 지정 기능 살려 둠 //

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

    const addMarkersToMap = () => {
      places.forEach((place) => {
        const markerPosition = new window.kakao.maps.LatLng(
          place.y,
          place.x,
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);

        window.kakao.maps.event.addListener(marker, 'click', () => {
          setSelectedPlace(place);
          map.setCenter(markerPosition);
        });
      });

      if (places.length > 0) {
        const firstPlace = places[0];
        const firstPlacePosition = new window.kakao.maps.LatLng(
          firstPlace.y,
          firstPlace.x,
        );
        map.setCenter(firstPlacePosition); // 검색에 해당하는 첫 번째 장소로 지도 이동
      }
    };

    addMarkersToMap();

  }, [startPath]);

    // 확인용 console
    useEffect(() => {
      console.log('startPath: ', startPath)
      console.log('endPath: ', endPath)
    }, [startPath, endPath])

  // polyline 그리기
  useEffect(() => {
    console.log('polyline 그리기')
    if (dataCheck === true && mapRef.current) {
      // path 데이터 저장용 빈 배열
      const linePath = [];

      // roadPath의 데이터를 kakao.maps.LatLng() 메서드에 입력
      for(let i = 0; i < roadPath.length; i = i+2) {
        const lng = roadPath[i];
        const lat = roadPath[i + 1];
        const latlng = new window.kakao.maps.LatLng(lat, lng);
        linePath.push(latlng)
      }

      console.log('linePath', linePath)
      const polyline = new window.kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 7,
        strokeColor: '#F86F03',
        strokeOpacity: 1,
        strokeStyle: 'solid',
      });

      polyline.setMap(mapRef.current);
    }
  }, [dataCheck, roadPath]);

  // ! removeListener 해결 전까지 임시로 예전 코드 복구해두고 기능 막아둠
  // const startPoint = () => window.kakao.maps.event.addListener(mapRef.current, 'click', function (mouseEvent: { latLng: any }) {
  //   const latlng = mouseEvent.latLng;
  //   console.log('handleStart')
  //   setStartPath([latlng.getLat(), latlng.getLng()])
  //   const message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, 경도는 ' + latlng.getLng() + ' 입니다';
  //   const resultDiv = document.getElementById('result')!;
  //   resultDiv.innerHTML = message;
  // });

  // const endPoint = () => window.kakao.maps.event.addListener(mapRef.current, 'click', function (mouseEvent: { latLng: any }) {
  //   const latlng = mouseEvent.latLng;
  //   console.log('handleEnd')
  //   setEndPath([latlng.getLat(), latlng.getLng()])
  //   const message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, 경도는 ' + latlng.getLng() + ' 입니다';
  //   const resultDiv = document.getElementById('result')!;
  //   resultDiv.innerHTML = message;
  // });

  // const handleNaviStart = () => {
  //   window.kakao.maps.event.removeListener(mapRef.current, 'click', endPoint());
  //   if (mapRef.current) {
  //     console.log('handleNaviStart')
  //     startPoint();
  //   }
  //   // removeListener() 를 통해 addListener()를 제거해야 함
  //   // removeListener()를 사용하려면 const aaa = window.kakao.maps.event.addListener(mapRef.current, 'click', function (mouseEvent: { latLng: any }) { ... } 이런 형식으로 사용해야함
  //   // 지금처럼 바로 addListener()를 사용하면 참조값을 찾을 수 없어 해제가 불가능
  // }

  // const handleNaviEnd = () => {
  //   window.kakao.maps.event.removeListener(mapRef.current, 'click', startPoint());
  //   if (mapRef.current) {
  //     console.log('handleNaviEnd')
  //     endPoint();
  //   }
  //   // removeListener() 를 통해 addListener()를 제거해야 함
  // }

  // 경로안내 버튼 클릭 시 지정된 출발지/도착지 정보를 가지고 최단거리 산출
  const handleNavi = () => {
    const url = `https://apis-navi.kakaomobility.com/v1/directions?priority=RECOMMEND&car_type=1&car_fuel=GASOLINE&origin=${startPath[1]}%2C+${startPath[0]}&destination=${endPath[1]}%2C+${endPath[0]}`;
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
      console.log('응답 : ', jsonData)
      
      // 응답 데이터에서 roads 데이터만 추출
      const roadData = jsonData['routes'][0]['sections'][0]['roads']
      console.log('roadData : ', roadData);

      // roads 데이터에서 반복문을 통해 Node 좌표 추출
      const NodeData: number[] = []
      for(let i = 0; i < roadData.length; i++) {
        for(let j = 0; j < roadData[i]['vertexes'].length; j++) {
          NodeData.push(roadData[i]['vertexes'][j])
        }
      }
      console.log(NodeData)
      // Node 좌표를 RoadPath에 저장
      setRoadPath(NodeData);
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

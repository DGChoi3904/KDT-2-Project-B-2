/* 키값 2개 넣어야함. fix검색*/
import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

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
  const [map, setMap] = useState<any>(null);
  const [startPath, setStartPath] = useState<string[]>([]);
  const [endPath, setEndPath] = useState<string[]>([]);
  const [roadPath, setRoadPath] = useState<number[]>([]);
  const [dataCheck, setDataCheck] = useState<boolean>(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=js키값넣기&libraries=services`; //fix
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOptions = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };

        const newMap = new window.kakao.maps.Map(mapContainer, mapOptions);
        setMap(newMap);

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

            marker.setMap(newMap);

            window.kakao.maps.event.addListener(
              map,
              'click',
              function (mouseEvent: { latLng: any }) {
                var latlng = mouseEvent.latLng;

                if (startPath.length === 0) {
                  setStartPath([latlng.getLat(), latlng.getLng()]);
                } else {
                  setEndPath([latlng.getLat(), latlng.getLng()]);
                }
              },
            );
          });

          if (places.length > 0) {
            const firstPlace = places[0];
            const firstPlacePosition = new window.kakao.maps.LatLng(
              firstPlace.y,
              firstPlace.x,
            );
            newMap.setCenter(firstPlacePosition); // 검색에 해당하는 첫 번째 장소로 지도 이동
          }
        };

        addMarkersToMap();
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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

        if (map && result.length > 0) {
          const firstPlace = result[0];
          const firstPlacePosition = new window.kakao.maps.LatLng(
            firstPlace.y,
            firstPlace.x,
          );
          map.setCenter(firstPlacePosition);
        }
      }
    });
  };

  useEffect(() => {
    const Container = document.getElementById('map'); // 지도를 표시할 div
    const Options = {
      center: new window.kakao.maps.LatLng(36.35, 127.385), // 지도의 중심좌표
      level: 5, // 지도의 확대 레벨
    };

    const map = new window.kakao.maps.Map(Container, Options);

    window.kakao.maps.event.addListener(
      map,
      'click',
      function (mouseEvent: { latLng: any }) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        var latlng = mouseEvent.latLng;

        // 마우스 클릭을 통한 출발지, 도착지 설정
        if (startPath.length === 0) {
          setStartPath([latlng.getLat(), latlng.getLng()]);
        } else {
          setEndPath([latlng.getLat(), latlng.getLng()]);
        }
      },
    );

    // roadPath에 데이터가 들어오면 카카오의 polyline 생성자 함수를 이용해 지도에 경로를 표시
    if (dataCheck === true) {
      const linePath = [];

      for (let i = 0; i < roadPath.length; i = i + 2) {
        const lng = roadPath[i];
        const lat = roadPath[i + 1];
        const latlng = new window.kakao.maps.LatLng(lat, lng);
        linePath.push(latlng);
      }

      const polyline = new window.kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 7, // 선의 두께 입니다
        strokeColor: '#F86F03', // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid', // 선의 스타일입니다
      });

      polyline.setMap(map);
    }
  }, [startPath, endPath, dataCheck, roadPath]);

  // 확인용 console
  useEffect(() => {
    console.log('startPath: ', startPath);
    console.log('endPath: ', endPath);
  }, [startPath, endPath]);

  const handleNavi = () => {
    const url = `https://apis-navi.kakaomobility.com/v1/directions?priority=RECOMMEND&car_type=1&car_fuel=GASOLINE&origin=${startPath[1]}%2C+${startPath[0]}&destination=${endPath[1]}%2C+${endPath[0]}`;
    const headers = {
      Authorization: 'KakaoAK 키값넣기', //fix
    };

    fetch(url, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((jsonData) => {
        const roadData = jsonData['routes'][0]['sections'][0]['roads'];
        const NodeData: number[] = [];
        for (let i = 0; i < roadData.length; i++) {
          for (let j = 0; j < roadData[i]['vertexes'].length; j++) {
            NodeData.push(roadData[i]['vertexes'][j]);
          }
        }
        setRoadPath(NodeData);
        setDataCheck(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div id="map" className="MapNormalSize"></div>
      <button onClick={handleNavi}>경로 안내</button>
    </div>
  );
}

export default KakaoMap;

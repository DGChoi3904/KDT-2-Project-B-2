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

  useEffect(() => {
    //키값입력
    const script = document.createElement('script'); //지도 표시
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=56e0838eacaf61521c3d4fed329a1b00&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      //지도생성
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOptions = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };

        const newMap = new window.kakao.maps.Map(mapContainer, mapOptions);
        setMap(newMap);
        //장소 검색시 이동
        const placesService = new window.kakao.maps.services.Places();
        //키워드 검색, 입력한 곳의 위도, 경도 파악
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
        //마커설정을 했으나, 마커X
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

            window.kakao.maps.event.addListener(marker, 'click', () => {
              setSelectedPlace(place);
              newMap.setCenter(markerPosition);
            });
          });
          // 검색 리스트중에 가장 근접한 장소(첫번째)의 위도, 경도값을 파악해서 지도에 보이게 설정.
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
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      {/* <div> //검색 시 목록이 보임(위 코드 참고하면 첫번째장소가 지도에 띄우는 걸 확인 할 수 있음.)
        {places.map((place) => (
          <div key={place.id}>{place.name}</div>
        ))}
      </div> */}
    </div>
  );
}

export default KakaoMap;

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

  useEffect(() => {
    //링크 삽입 api키 넣으세요
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=키값넣으세요&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOptions = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOptions);

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
            });
          });
        };

        if (selectedPlace) {
          const destination = new window.kakao.maps.LatLng(
            selectedPlace.y,
            selectedPlace.x,
          );
          const path = new window.kakao.maps.Polyline({
            path: [map.getCenter(), destination],
            strokeWeight: 5,
            strokeColor: '#2E64FE',
            strokeOpacity: 0.7,
            strokeStyle: 'solid',
          });

          path.setMap(map);

          const distance =
            window.kakao.maps.geometry.spherical.computeDistanceBetween(
              map.getCenter(),
              destination,
            );
          console.log('Distance:', distance);
        }

        searchPlaces(keyword);
        addMarkersToMap();
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [keyword, selectedPlace]);

  const handleSearch = () => {
    // 검색 버튼 클릭 시 장소 검색
    // searchPlaces(keyword); //fix
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
      <div>
        {places.map((place) => (
          <div key={place.id}>{place.name}</div>
        ))}
      </div>
    </div>
  );
}

export default KakaoMap;

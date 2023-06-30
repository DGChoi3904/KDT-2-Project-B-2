import React, { useEffect, useState, useRef } from 'react';
import './Main.css';

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
  const startRef = useRef<string[]>([]);
  const endRef = useRef<string[]>(endPath);

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

    // 임시로 직접 클릭으로 좌표 지정 기능 살려 둠 //
    // window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: { latLng: any }) {
    //   const latlng = mouseEvent.latLng;

    //   if (startPath.length === 0) {
    //     setStartPath([latlng.getLat(), latlng.getLng()]);
    //   } else {
    //     setEndPath([latlng.getLat(), latlng.getLng()]);
    //   }

    //   const message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, 경도는 ' + latlng.getLng() + ' 입니다';
    //   const resultDiv = document.getElementById('result')!;
    //   resultDiv.innerHTML = message;
    // });
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

  }, []);

  useEffect(() => {
    window.kakao.maps.event.addListener(mapRef.current, 'click', function (mouseEvent: { latLng: any }) {
      const latlng = mouseEvent.latLng;

      if(startRef.current.length === 0) {
        setStartPath([latlng.getLat(), latlng.getLng()]);
      } else if(startRef.current.length !== 0) {
        setEndPath([latlng.getLat(), latlng.getLng()]);
      } else {
        console.log('그 외')
      }

      const message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, 경도는 ' + latlng.getLng() + ' 입니다';
      const resultDiv = document.getElementById('result')!;
      resultDiv.innerHTML = message;
    });
  }, [startPath, endPath])


    // 확인용 console
    useEffect(() => {
      startRef.current = startPath;
      endRef.current = endPath;
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

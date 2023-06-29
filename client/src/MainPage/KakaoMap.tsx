import React, { useEffect, useState, useRef } from 'react';
import './Main.css';

function KakaoMap() {
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
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      window.kakao.maps.event.addListener(mapRef.current, 'click', function (mouseEvent: { latLng: any }) {
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
    }
  }, []);

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

  // 경로안내 버튼 클릭 시 지정된 출발지/도착지 정보를 가지고 최단거리 산출
  const handleNavi = () => {
    const url = `https://apis-navi.kakaomobility.com/v1/directions?priority=RECOMMEND&car_type=1&car_fuel=GASOLINE&origin=${startPath[1]}%2C+${startPath[0]}&destination=${endPath[1]}%2C+${endPath[0]}`;
    console.log('url: ', url);

    const headers = {
      Authorization: 'KakaoAK 0f6a05d1d1d9ce7b4b2d324b0e39f02d',
    };

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
  }

  return (
    <div>
      <div id="map" className="MapNormalSize"></div>
      <div id="result"></div>
      <button onClick={handleNavi}>경로 안내</button>
    </div>
  );
}

export default KakaoMap;

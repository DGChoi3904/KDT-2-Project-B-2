import React, { useEffect, useState } from 'react';
import './Main.css';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;


function KakaoMap() {
  const [startPath, setStartPath] = useState<string[]>([]);
  const [endPath, setEndPath] = useState<string[]>([]);
  const [roadPath, setRoadPath] = useState<number[]>([]);
  const [dataCheck, setDataCheck] = useState<boolean>(false);

  useEffect(() => {
    const Container = document.getElementById('map'); // 지도를 표시할 div
    const Options = {
      center: new kakao.maps.LatLng(36.35, 127.385), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(Container, Options);

    kakao.maps.event.addListener(
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

        var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';

        var resultDiv = document.getElementById('result')!;
        resultDiv.innerHTML = message;
      },
    );

    // roadPath에 데이터가 들어오면 카카오의 polyline 생성자 함수를 이용해 지도에 경로를 표시
    if(dataCheck === true) {
      const linePath = [];
      console.log('라인 그리기')
      
      for(let i = 0; i < roadPath.length; i = i+2) {
        const lng = roadPath[i];
        const lat = roadPath[i + 1];
        const latlng = new kakao.maps.LatLng(lat, lng);
        linePath.push(latlng)
      }
      console.log('linePath: ', linePath)

      const polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 7, // 선의 두께 입니다
        strokeColor: '#F86F03', // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
      });
      console.log('setMap')
      polyline.setMap(map);
    }

  }, [startPath, endPath, dataCheck, roadPath]);

  // 확인용 console
  useEffect(() => {
    console.log('startPath: ', startPath)
    console.log('endPath: ', endPath)
  }, [startPath, endPath])

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

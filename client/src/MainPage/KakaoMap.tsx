import React, { useEffect } from 'react';
import './Main.css';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

interface Vertex {
  name: string;
  distance: number;
  duration: number;
  traffic_speed: number;
  traffic_state: number;
  vertexes: number[];
}

function KakaoMap() {
  const roads: Vertex[] = [
    //경로
    {
      name: '', //출발-도착
      distance: 35,
      duration: 5,
      traffic_speed: 28,
      traffic_state: 0,
      vertexes: [
        127.37777924062172, 36.34951161144906, 127.3774326598655,
        36.34966301866899,
      ],
    },
    {
      name: '대덕대로',
      distance: 479,
      duration: 73,
      traffic_speed: 45,
      traffic_state: 4,
      vertexes: [
        127.3774326598655, 36.34966301866899, 127.37850012880077,
        36.351326872479014, 127.3790946550512, 36.35222219897972,
        127.3792047778375, 36.35238499582129, 127.37932496913857,
        36.352683032105084, 127.3793903853496, 36.35286362152033,
        127.37944458914623, 36.35305316515289, 127.37947629620568,
        36.35326962938573, 127.37948486268036, 36.35359412322795,
      ],
    },
    {
      name: '대덕대로234번길',
      distance: 314,
      duration: 108,
      traffic_speed: 4,
      traffic_state: 1,
      vertexes: [
        127.37948486268036, 36.35359412322795, 127.38033159890459,
        36.35359851706841, 127.3819695080121, 36.35358897442774,
        127.38298350589486, 36.3535761894513,
      ],
    },
    {
      name: '둔산서로',
      distance: 252,
      duration: 51,
      traffic_speed: 30,
      traffic_state: 3,
      vertexes: [
        127.38298350589486, 36.3535761894513, 127.38297767411672,
        36.354315182962026, 127.3829957608514, 36.35484701280479,
        127.38297679588614, 36.355838287801525,
      ],
    },
    {
      name: '둔산북로',
      distance: 90,
      duration: 32,
      traffic_speed: 30,
      traffic_state: 3,
      vertexes: [
        127.38297679588614, 36.355838287801525, 127.3819739814907,
        36.35584211794818,
      ],
    },
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=Y키값`;
    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window;

      const Container = document.getElementById('map');
      const Options = {
        center: new kakao.maps.LatLng(36.35, 127.385),
        level: 3,
      };

      const map = new kakao.maps.Map(Container, Options);

      const startLatLng = new kakao.maps.LatLng(
        36.349267414162014,
        127.37761406703146,
      );
      const endLatLng = new kakao.maps.LatLng(
        36.35620266001714,
        127.38198227349935,
      );

      const startMarker = new kakao.maps.Marker({ position: startLatLng });
      const endMarker = new kakao.maps.Marker({ position: endLatLng });
      startMarker.setMap(map);
      endMarker.setMap(map);

      const path: kakao.maps.LatLng[] = [];

      roads.forEach((road) => {
        const vertices = road.vertexes.map(
          (vertex) => new kakao.maps.LatLng(vertex[1], vertex[0]),
        );
        path.push(...vertices);
      });

      const startToEndPath = new kakao.maps.Polyline({
        path: [startLatLng, ...path, endLatLng],
        strokeWeight: 5,
        strokeColor: '#2E64FE',
        strokeOpacity: 0.7,
        strokeStyle: 'solid',
      });
      startToEndPath.setMap(map);
    };

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="map" className="MapNormalSize"></div>
      <div id="result"></div>
    </div>
  );
}

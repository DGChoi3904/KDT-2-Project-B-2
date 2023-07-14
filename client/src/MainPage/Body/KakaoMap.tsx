import React, {
  useEffect,
  useState,
  useRef,
  useReducer,
  useContext,
} from 'react';
import Modal, { Styles } from 'react-modal';
import '../Main.css';
import SaveWayModal from '../Modal/SaveWayModal';
import MarkerImgSet from './markerImgSet';
import { MapContext, NaviContext } from '../../util/MapContext';
import { MyWayContext } from '../../util/LoginContext';

import Timer from './Timer';
import PathButtonBlock from './PathButtonBlock';
import PaginatedPlaces from './PaginatedPlaces';
interface Place {
  id: string;
  name: string;
  x: number;
  y: number;
}

declare global {
  interface Window {
    kakao: any;
    naver: any;
  }
}

const modalStyles: Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '200px',
    border: '1px solid black',
    backgroundColor: 'beige',
    padding: '0',
  },
};

type WayMarkerObj = {
  name: string;
  marker: any;
};

type WayMarkersState = {
  wayCount: number;
  wayMarkers: WayMarkerObj[];
};

type WayMarkersAction = {
  type: string;
  payload?: any;
};

const wayMarkerInitialState: WayMarkersState = {
  wayCount: 0,
  wayMarkers: [],
};

const KakaoMap: React.FC = () => {
  const { naviSearchCounter, setNaviDataResult } = useContext(NaviContext);

  const {
    startPoint,
    setStartPoint,
    endPoint,
    setEndPoint,
    wayPoint,
    setWayPoint,
    setIsSearchingStart,
    setIsSearchingEnd,
  } = useContext(MapContext);
  const addWayPoint = (pointY: number, pointX: number) => {
    setWayPoint([...wayPoint, pointY, pointX]);
  };

  const { myWayUI, setDetail, setCurrentMyWayNameObj } =
    useContext(MyWayContext);

  const [keyword, setKeyword] = useState(''); // input
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const [showPlaces, setShowPlaces] = useState(true); //? 길 리스트 숨김 처리
  const [waySaveBtn, setWaySaveBtn] = useState<boolean>(false); //? 길 저장 버튼 활성화/비활성화

  const [time, setTime] = useState<number[]>([]);
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [distance, setDistance] = useState<number[]>([]);
  const [searchPlaces, setSearchPlaces] = useState(1); //? 검색 리스트

  const mapRef = useRef<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false); //? 모달 상태 제어

  const [mongoStart, setMongoStart] = useState<string>(''); //몽고 DB에 저장할 데이터들
  const [mongoWay, setMongoWay] = useState<string[] | null>(null);
  const [mongoEnd, setMongoEnd] = useState<string>('');
  const [addWayPointDB, setAddWayPointDB] = useState<
    | {
        mongoStart: string | null;
        mongoWay: string[] | null;
        mongoEnd: string | null;
      }
    | undefined
  >();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  type Marker = {
    name: string;
    marker: any;
  };
  const [startMarker] = useState<Marker>({
    name: '',
    marker: new window.kakao.maps.Marker({
      image: MarkerImgSet.setStartMarkerImg(),
      zIndex: 3,
    }),
  });
  const [endMarker] = useState<Marker>({
    name: '',
    marker: new window.kakao.maps.Marker({
      image: MarkerImgSet.setEndMarkerImg(),
      zIndex: 3,
    }),
  });

  const [wayMarkerState, wayMarkerDispatch] = useReducer(
    wayMarkerReducer,
    wayMarkerInitialState,
  );
  const [polyLines, setPolyLines] = useState<any[]>([]);

  function wayMarkerReducer(state: WayMarkersState, action: WayMarkersAction) {
    switch (action.type) {
      case 'RESET_WAY_MARKERS':
        state.wayMarkers.forEach((markerObj) => {
          markerObj.marker.setMap(null);
        });
        return { ...state, wayCount: 0, wayMarkers: [] };
      case 'ADD_WAY_MARKER':
        const markerPosition = new window.kakao.maps.LatLng(
          action.payload.y,
          action.payload.x,
        );
        const markerWay = new window.kakao.maps.Marker({
          position: markerPosition,
          map: mapRef.current!,
          image: MarkerImgSet.setWaypointMarkerImg(),
        });
        const markerWayObj: WayMarkerObj = {
          name: action.payload.name,
          marker: markerWay,
        };
        markerWay.setMap(mapRef.current);
        mapRef.current.setCenter(markerPosition);
        return {
          ...state,
          wayMarkers: [...state.wayMarkers, markerWayObj],
          wayCount: state.wayCount + 1,
        };
      case 'RESET_WAY_COUNT':
        return {
          ...state,
          wayCount: 0,
        };
      default:
        return state;
    }
  }

  useEffect(() => {
    console.log('몽고스테이트 값 변경됨', '출발 : ', mongoStart);
    console.log('경유 : ', mongoWay ? mongoWay : `없음`);
    console.log('도착 : ', mongoEnd); //값이 변할때 mongoState확인
    const aSendObj = { mongoStart, mongoWay, mongoEnd };
    setAddWayPointDB(aSendObj);
  }, [mongoStart, mongoWay, mongoEnd]);

  // 지도 생성
  useEffect(() => {
    const Container = document.getElementById('map');
    const Options = {
      center: new window.kakao.maps.LatLng(36.35, 127.385),
      level: 3,
    };
    //맵 클릭시 검색결과 사라지게 하기
    const mapClick = () => {
      setShowPlaces(false);
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
    window.kakao.maps.event.addListener(map, 'click', mapClick); //맵 클릭 리스트 숨김
  }, []);

  // 시간·거리 표시
  useEffect(() => {
    // sections의 소요 시간 합계 계산
    const timeSum: number = time.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    // 분 계산
    if (Math.floor(timeSum / 60) > 60) {
      const hour: number = Math.floor(Math.floor(timeSum / 60) / 60);
      setHour(hour);
      const minutes: number = Math.floor(timeSum / 60) % 60;
      setMinute(minutes);
    } else {
      const minutes: number = Math.floor(timeSum / 60);
      setMinute(minutes);
    }
    // 초 계산
    const seconds: number = timeSum % 60;
    setSecond(seconds);
  }, [time, distance, minute, second]);

  // 경로안내 버튼 클릭 시 지정된 출발지/도착지 정보를 가지고 최단거리 산출
  const handleNavi = () => {
    let url;
    //mapRef.current.setLevel(5); // 경로 안내 클릭시 지도 범위 변경
    //! 경유지가 없을 경우
    if (wayPoint.length === 0) {
      url = `https://apis-navi.kakaomobility.com/v1/directions?priority=DISTANCE&car_type=7&car_fuel=GASOLINE&origin=${startPoint[1]}%2C${startPoint[0]}&destination=${endPoint[1]}%2C${endPoint[0]}`;
      console.log('url1: ', url);
      setShowPlaces(false);
    } else {
      //! 경유지가 있을 경우
      const waypointsString = wayPoint
        .map((point, index) => {
          if (index % 2 === 0) {
            const nextIndex = index + 1;
            if (nextIndex < wayPoint.length) {
              return `${wayPoint[nextIndex]}%2C${point}`;
            }
          }
          return null;
        })
        .filter((point) => point !== null)
        .join('%7C');
      url = `https://apis-navi.kakaomobility.com/v1/directions?priority=DISTANCE&car_type=7&car_fuel=GASOLINE&origin=${startPoint[1]}%2C${startPoint[0]}&destination=${endPoint[1]}%2C${endPoint[0]}&waypoints=${waypointsString}`;
      console.log('url2: ', url);
      setShowPlaces(false); //검색후 결과값, 버튼 숨김 처리
    }

    // MongoDB에 저장하기 위해 변환 함수 실행
    transferMongo(startPoint, wayPoint, endPoint);

    const headers = {
      Authorization: 'KakaoAK 0ce7da7c92dd2a150bc0111177dfc283',
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
        setNaviDataResult(jsonData);
        setMapBounds();
        wayMarkerDispatch({ type: 'RESET_WAY_COUNT' });
        // 폴리라인 저장용 배열
        let polyLineArr: any[] = [];
        // 응답 데이터에서 roads 데이터만 추출
        const roadData = jsonData['routes'][0]['sections'][0]['roads'];
        const timeData: number[] = [];
        const distanceData: number[] = [];
        console.log('roadData : ', roadData);
        console.log('timeData : ', timeData);
        console.log('distanceData : ', distanceData);

        // roads 데이터에서 반복문을 통해 Node 좌표 추출
        for (let a = 0; a < jsonData['routes'][0]['sections'].length; a++) {
          timeData.push(jsonData['routes'][0]['sections'][a]['duration']);
          distanceData.push(jsonData['routes'][0]['sections'][a]['distance']);
          for (
            let i = 0;
            i < jsonData['routes'][0]['sections'][a]['roads'].length;
            i++
          ) {
            // 좌표 저장용 배열
            const traffic = [];
            for (
              let j = 0;
              j <
              jsonData['routes'][0]['sections'][a]['roads'][i]['vertexes']
                .length;
              j = j + 2
            ) {
              const lng =
                jsonData['routes'][0]['sections'][a]['roads'][i]['vertexes'][j];
              const lat =
                jsonData['routes'][0]['sections'][a]['roads'][i]['vertexes'][
                  j + 1
                ];
              const latlng = new window.kakao.maps.LatLng(lat, lng);
              traffic.push(latlng);

              // 도로의 트래픽에 따라 polyline 색상값 변경
              let strokeColors;
              switch (
                jsonData['routes'][0]['sections'][a]['roads'][i][
                  'traffic_state'
                ]
              ) {
                case 0:
                  strokeColors = '#2DB400';
                  break;
                case 1:
                  strokeColors = '#C80000';
                  break;
                case 2:
                  strokeColors = '#F86F03';
                  break;
                case 3:
                  strokeColors = '#FEE500';
                  break;
                case 4:
                  strokeColors = '#2DB400';
                  break;
                case 6:
                  strokeColors = '#6B6E70';
                  break;
                default:
                  strokeColors = '#000000';
                  break;
              }

              const polyline = new window.kakao.maps.Polyline({
                path: traffic,
                strokeWeight: 7,
                strokeColor: strokeColors,
                strokeOpacity: 1,
                strokeStyle: 'solid',
              });
              if (
                j ===
                jsonData['routes'][0]['sections'][a]['roads'][i]['vertexes']
                  .length -
                  2
              ) {
                polyline.setMap(null);
                polyline.setMap(mapRef.current);
                // 저장용 배열에 폴리라인 추가
                polyLineArr.push(polyline);
                // 저장용 배열이 갱신될때마다 PolyLines 상태값 변경
                setPolyLines(polyLineArr);
              }
            }
          }
        }
        setTime(timeData);
        setDistance(distanceData);
        setWaySaveBtn(true);
        setDetail(true);

        setEndPoint([0, 0]);
        setStartPoint([0, 0]);
        setWayPoint([]);
        wayMarkerDispatch({ type: 'RESET_WAY_COUNT' });
      })
      .catch((error) => {
        // 오류 처리
        console.error(error);
      });
  };

  const handleSearch = () => {
    isNewSearch(); //새로운 검색인지 확인
    isPolyLineDrawn(); //polyline이 그려져있는지 확인
    setDetail(false); //상세정보 숨김처리
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
          mapRef.current.setLevel(2); //검색후 지도 level설정
          mapRef.current.setCenter(firstPlacePosition);
        }
        setShowPlaces(true);
      }
    });
  };
  // 미리보기
  const handleSelectPlacePre = (place: Place) => {
    const SelectPosition = new window.kakao.maps.LatLng(place.y, place.x);
    mapRef.current.setCenter(SelectPosition);
    console.log('미리보는 중!');
    console.log(
      `출발지 좌표 : ${startPoint}, 경유지 좌표 ${wayPoint}, 목적지 좌표 ${endPoint}`,
    );
  };

  function isPolyLineDrawn() {
    if (polyLines.length > 0) {
      polyLines.forEach((polyLine) => {
        polyLine.setMap(null);
      });
      setPolyLines([]);
    }
  }

  //출발지 마커
  function handleSelectPlace(place: Place) {
    isPolyLineDrawn(); //polyline이 그려져있는지 확인
    const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
    if (!startMarker.marker.getMap()) {
      startMarker.marker.setPosition(markerPosition);
      startMarker.marker.setMap(mapRef.current);
    } else {
      startMarker.marker.setPosition(markerPosition);
    }

    mapRef.current.setCenter(markerPosition); //해당하는 좌표를 가지고 지도 중심으로 이동시킴
    setSelectedPlace(place);
    setStartPoint([Number(place.y), Number(place.x)]);
    setIsSearchingStart(false);
    console.log(
      `출발지 좌표 : ${startPoint}, 경유지 좌표 ${wayPoint}, 목적지 좌표 ${endPoint}`,
    );
    //출발지 인포윈도우 (장소명)
    const content = `<div style="padding: 1px;">${place.name}</div>`;
    const infowindow = new window.kakao.maps.InfoWindow({
      content: content,
      zIndex: 1,
    });
    infowindow.open(mapRef.current, startMarker.marker);
  }
  //도착지 마커
  const handleSelectPlaceEnd = (place: Place) => {
    isPolyLineDrawn(); //polyline이 그려져있는지 확인
    const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
    if (!endMarker.marker.getMap()) {
      endMarker.marker.setPosition(markerPosition);
      endMarker.marker.setMap(mapRef.current);
    } else {
      endMarker.marker.setPosition(markerPosition);
    }

    mapRef.current.setCenter(markerPosition); //해당하는 좌표를 가지고 지도 중심으로 이동시킴
    setSelectedPlace(place);
    setEndPoint([Number(place.y), Number(place.x)]);
    setIsSearchingEnd(false);
    console.log(
      `출발지 좌표 : ${startPoint}, 경유지 좌표 ${wayPoint}, 목적지 좌표 ${endPoint}`,
    );
    //인포윈도우
    const content = `<div style="padding: 1px;">${place.name}</div>`;
    const infowindow = new window.kakao.maps.InfoWindow({
      content: content,
      zIndex: 1,
    });
    infowindow.open(mapRef.current, endMarker.marker);
  };
  //경유지 마커
  const handleSelectPlaceWay = (place: Place) => {
    isPolyLineDrawn(); //polyline이 그려져있는지 확인
    //경유지 5개로 설정
    if (wayMarkerState.wayCount === 0) {
      wayMarkerDispatch({ type: 'RESET_WAY_MARKERS' });
    }

    if (wayMarkerState.wayCount < 5) {
      wayMarkerDispatch({ type: 'ADD_WAY_MARKER', payload: place });
      setSelectedPlace(place);
      addWayPoint(Number(place.y), Number(place.x));
    } else {
      alert('경유지는 5개까지만 설정 가능합니다.');
    }
    console.log(
      `출발지 좌표 : ${startPoint}, 경유지 좌표 ${wayPoint}, 목적지 좌표 ${endPoint}`,
    );
  };

  useEffect(() => {
    if (naviSearchCounter > 0) {
      loadMyWayMarkers();
      handleNavi();
      console.log('아마도 경유지?: ', naviSearchCounter);
    }
  }, [naviSearchCounter]);

  function loadMyWayMarkers() {
    //폴리 라인이 그려져 있으면 지도에서 삭제
    isPolyLineDrawn();
    //마커가 그려져있으면 지도에서 삭제
    if (startMarker.marker.getMap()) {
      startMarker.marker.setMap(null);
    }
    if (endMarker.marker.getMap()) {
      endMarker.marker.setMap(null);
    }
    if (wayMarkerState.wayMarkers.length > 0) {
      wayMarkerDispatch({ type: 'RESET_WAY_MARKERS' });
    }
    //마커가 그려져있지 않으면 지도에 마커 그리기
    //출발지 마커
    if (startPoint[0] !== 0 && startPoint[1] !== 0) {
      startMarker.marker.setPosition(
        new window.kakao.maps.LatLng(startPoint[0], startPoint[1]),
      );
      startMarker.marker.setMap(mapRef.current);
    }
    //도착지 마커
    if (endPoint[0] !== 0 && endPoint[1] !== 0) {
      endMarker.marker.setPosition(
        new window.kakao.maps.LatLng(endPoint[0], endPoint[1]),
      );
      endMarker.marker.setMap(mapRef.current);
    }
    //경유지 마커
    if (wayPoint.length > 0) {
      for (let i = 0; i < wayPoint.length; i += 2) {
        wayMarkerDispatch({
          type: 'ADD_WAY_MARKER',
          payload: {
            x: wayPoint[i + 1],
            y: wayPoint[i],
            place_name: `경유지 #${i / 2 + 1}`,
          },
        });
      }
    }
  }

  function isStartorEndMarkerDrawn(point: string) {
    if (point === 'start' && startMarker.marker.getMap()) {
      if (endPoint[0] === 0 && endPoint[1] === 0) {
        startMarker.marker.setMap(null);
      }
    }
    if (point === 'end' && endMarker.marker.getMap()) {
      if (endPoint[0] === 0 && endPoint[1] === 0) {
        endMarker.marker.setMap(null);
      }
    }
  }

  function handleDefaultSearch() {
    //출발지, 목적지 입력을 안했을 경우 안내창
    if (
      //출발지 좌표가 0,0이고 목적지 좌표가 0이 아닐 경우
      startPoint[0] === 0 &&
      startPoint[1] === 0 &&
      endPoint[0] !== 0
    ) {
      alert('출발지를 입력해야합니다.');
      return;
    } else if (
      //목적지 좌표가 0,0 이고 출발지 좌표가 0이 아닐 경우
      endPoint[0] === 0 &&
      endPoint[1] === 0 &&
      startPoint[0] !== 0
    ) {
      alert('목적지를 입력해야합니다.');
      return;
    } else if (
      startPoint[0] === 0 &&
      startPoint[1] === 0 &&
      endPoint[0] === 0 &&
      endPoint[1] === 0
    ) {
      alert('출발지와 목적지를 입력해야합니다.');
      return;
    } else {
      //경로저장 버튼 클릭시 실행 할 메소드
      setCurrentMyWayNameObj({ index: 0, name: '' });
      handleNavi();
    }
  }
  function setMapBounds() {
    //경로 안내버튼 클릭하면 모든 마커가 보이게 지도 설정
    const bounds = new window.kakao.maps.LatLngBounds(); //LatLngBounds 객체 생성
    // 출발지 마커 bounds에 추가
    if (startPoint.length === 2) {
      const startLatLng = new window.kakao.maps.LatLng(
        startPoint[0], //위도, 경도 이므로 2개
        startPoint[1],
      );
      bounds.extend(startLatLng);
    }
    // 경유지 마커 bounds에 추가 (경유지가 있는 경우)
    if (wayPoint.length > 0) {
      for (let i = 0; i < wayPoint.length; i += 2) {
        const wayLatLng = new window.kakao.maps.LatLng(
          wayPoint[i], //경유지가 n개 이므로(위도, 경도가 n개)
          wayPoint[i + 1],
        );
        bounds.extend(wayLatLng);
      }
    }
    // 목적지 마커 위치 bounds에 추가
    if (endPoint.length === 2) {
      const endLatLng = new window.kakao.maps.LatLng(
        endPoint[0], //위도, 경도 이므로 2개
        endPoint[1],
      );
      bounds.extend(endLatLng);
    }
    mapRef.current.setBounds(bounds); // 출발지, 목적지,(경유지)마커 보이게 지도 범위 설정
  }
  const transferMongo = (start: number[], way: number[], end: number[]) => {
    let strStart: string = '';
    let strWay: string[] = [];
    let strEnd: string = '';

    strStart = start.map((str) => str.toString()).join(', ');

    strWay = way.reduce((acc, num, idx) => {
      const pos = Math.floor(idx / 2);
      if (!acc[pos]) {
        acc[pos] = '';
      }
      acc[pos] += idx % 2 !== 0 ? `, ${num.toString()}` : num.toString();
      return acc;
    }, [] as string[]);

    strEnd = end.map((str) => str.toString()).join(', ');

    setMongoStart(strStart);
    setMongoWay(strWay);
    setMongoEnd(strEnd);
  };
  // 검색 목록 6곳 제한
  const listLimit = 6; // 6곳만 보이게 설정
  //검색 결과를 나눔
  const getPaginatedPlaces = () => {
    const startIndex = (searchPlaces - 1) * listLimit;
    const endIndex = startIndex + listLimit;
    return places.slice(startIndex, endIndex);
  };
  // 전체 목록 수
  const totalList = Math.ceil(places.length / listLimit);
  //목록 번호
  const numberList = (pageNumber: number) => {
    setSearchPlaces(pageNumber);
  };

  function isNewSearch() {
    setTime([0]);
    if (
      startPoint[0] === 0 &&
      startPoint[1] === 0 &&
      endPoint[0] === 0 &&
      endPoint[1] === 0 &&
      wayPoint.length === 0
    ) {
      isPolyLineDrawn(); //polyline이 그려져있는지 확인
      isStartorEndMarkerDrawn('start'); //시작 마커가 그려져있는지 확인
      isStartorEndMarkerDrawn('end'); //도착 마커가 그려져있는지 확인
      wayMarkerDispatch({ type: 'RESET_WAY_MARKERS' }); //경유지 마커가 그려져있는지 확인

      setMongoStart(''); //DB에 저장될 출발지 좌표 초기화
      setMongoWay([]); //DB에 저장될 경유지 좌표 초기화
      setMongoEnd(''); //DB에 저장될 목적지 좌표 초기화
    }
  }
  //네이버지도
  const naverMap = () => {
    const naverView = document.getElementById('naverMap');
    if (naverView) {
      naverView.style.display = 'block';
    }

    const mapOptions = {
      center: new window.naver.maps.LatLng(36.35, 127.385),
      zoom: 17, // 확대, 축소
    };
    const map = new window.naver.maps.Map(naverView, mapOptions);
    const kakaoMapContainer = document.getElementById('map');
    if (kakaoMapContainer) {
      kakaoMapContainer.style.display = 'none';
    }
    const naverButton = document.getElementById('naverButton');
    if (naverButton) {
      naverButton.style.display = 'block';
    }
    console.log('naverTest');
  };
  //카카오지도
  const KakaoMapView = () => {
    const naverView = document.getElementById('naverMap');
    if (naverView) {
      naverView.style.display = 'none';
    }
    const kakaoMapContainer = document.getElementById('map');
    if (kakaoMapContainer) {
      kakaoMapContainer.style.display = 'block';
    }
    console.log('kakaoTest');
  };

  return (
    <div>
      <div id="mapContainer" style={{ position: 'relative' }}>
        <div
          id="map"
          className={myWayUI ? 'MapNormalSize' : 'MapLongSize'}
        ></div>
        <div
          id="naverMap"
          style={{
            zIndex: '3',
            width: '430px',
            height: '600px',
            display: 'none',
          }}
        >
          {' '}
          <button
            id="naverButton"
            style={{
              background: 'none',
              border: 'none',
              display: 'block',
              height: '50px',
              width: '50px',
              position: 'absolute',
              zIndex: '4',
              marginLeft: '1%',
            }}
            onClick={naverMap}
          >
            <img
              src={process.env.PUBLIC_URL + '/resource/naverBtn.png'}
              alt="Naver"
            />
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              display: 'block',
              height: '50px',
              width: '50px',
              position: 'absolute',
              zIndex: '4',
              marginLeft: '10%',
            }}
            onClick={KakaoMapView}
          >
            <img
              src={process.env.PUBLIC_URL + '/resource/kakaoBtn.png'}
              alt="Kakao"
            />
          </button>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '10px',
            zIndex: '1',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            // marginLeft: '30%',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              margin: '0 auto',
              transform: 'translateX(-5%)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: '30px',
              }}
            >
              <button
                style={{ background: 'none', border: 'none' }}
                onClick={naverMap}
              >
                <img
                  src={process.env.PUBLIC_URL + '/resource/naverBtn.png'}
                  alt="Naver"
                />
              </button>
              <button style={{ background: 'none', border: 'none' }}>
                <img
                  src={process.env.PUBLIC_URL + '/resource/kakaoBtn.png'}
                  alt="Kakao"
                />
              </button>
            </div>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ height: '100%', marginLeft: '25%' }}
              onKeyDown={(e) => {
                //Enter로 검색 가능
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button style={{ height: '100%' }} onClick={handleSearch}>
              🔍
            </button>
          </div>
          {showPlaces && (
            <div
              style={{
                width: '70%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              {getPaginatedPlaces().map((place, index) => (
                <div
                  key={place.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ flex: '1' }}>
                    <div style={{ textAlign: 'left' }}>{place.name}</div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <button
                      onClick={() => handleSelectPlacePre(place)}
                      style={{ color: 'black' }}
                    >
                      미리보기
                    </button>
                    <button
                      onClick={() => {
                        handleSelectPlace(place); //출발지의 장소
                        setKeyword(place.name); //클릭한 장소의 이름이 input으로 전송
                      }}
                      style={{ color: 'blue' }}
                    >
                      출발지
                    </button>
                    <button
                      onClick={() => {
                        handleSelectPlaceEnd(place);
                        setKeyword(place.name);
                      }}
                      style={{ color: 'red' }}
                    >
                      목적지
                    </button>
                    <button
                      onClick={() => {
                        handleSelectPlaceWay(place);
                        setKeyword(place.name);
                      }}
                      style={{ color: 'rgb(255, 164, 27)' }}
                    >
                      경유지
                    </button>
                  </div>
                </div>
              ))}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}
              >
                {Array.from({ length: totalList }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => numberList(pageNumber)}
                      style={{
                        marginRight: '5px',
                        backgroundColor: '#FFA41B',
                        borderStyle: 'thin',
                        borderRadius: '5px',
                        margin: '0 2px',
                        width: '20px',
                      }}
                    >
                      {pageNumber}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {minute !== 0 && second !== 0 ? (
            <div className="timer">
              <img
                src={process.env.PUBLIC_URL + '/resource/timer.png'}
                className="timerImg"
                alt="timerImg"
              />{' '}
              {hour !== 0 ? hour + '시간' : ''}
              {minute}분 {second}초
            </div>
          ) : (
            <div style={{ display: 'none' }}></div>
          )}

          <div
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              bottom: '10px',
              right: '10px',
              zIndex: '2',
            }}
          >
            {waySaveBtn ? (
              <button onClick={openModal} style={{ padding: '5px' }}>
                경로 저장
              </button>
            ) : (
              <div></div>
            )}
            <button
              onClick={handleDefaultSearch}
              style={{ padding: '5px', marginLeft: '5px' }}
            >
              경로 안내
            </button>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={modalStyles}
          contentLabel="Login Modal"
        >
          <SaveWayModal addWayPointDB={addWayPointDB} onClose={closeModal} />
        </Modal>
      </div>
      <div id="result"></div>
    </div>
  );
};

export default KakaoMap;

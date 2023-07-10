import React, { useEffect, useState, useRef, useContext } from 'react';
import Modal, { Styles } from 'react-modal';
import '../Main.css';
import globalVar from '../../util/Global';
import SaveWayModal from '../Modal/SaveWayModal';

import { MyWayContext } from '../../util/MyWayContext';
import MyWayDetail from '../Footer/MyWayContents/MyWayDetail';
import MyWayList from '../Footer/MyWayContents/MyWayList';
import MyWayReqLogin from '../Footer/MyWayContents/MyWayReqLogin'
import MarkerImgSet from './markerImgSet';

interface Place {
  id: string;
  name: string;
  x: number;
  y: number;
}

declare global {
  interface Window {
    kakao: any;
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

type KakaoMapPros = {
  login: boolean;
  setDetail : React.Dispatch<React.SetStateAction<boolean>>;
};

const KakaoMap: React.FC<KakaoMapPros> = ({ login, setDetail }) => {
  const [showDetail, setShowDetail] = useState(false);
  const handleButtonClick = () => {
    // 버튼이 클릭되었을 때, MyWayDetail을 보여주기 위해 상위 컴포넌트(MainPage)로 이벤트를 전달
    setShowDetail(!showDetail);
  };

  const [loginCheck, setLoginCheck] = useState(false);
  const [keyword, setKeyword] = useState(''); // input
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  // const [startPath, setStartPath] = useState<string[]>([]);
  // const [endPath, setEndPath] = useState<string[]>([]);
  // const [wayPath, setWayPath] = useState<string[]>([]); //? 경유지
  // const [roadPath, setRoadPath] = useState<number[]>([]);
  const [wayCount, setWayCount] = useState<number>(0); //? 경유지 제한
  const [showPlaces, setShowPlaces] = useState(true); //? 길 리스트 숨김 처리
  const [waySaveBtn, setWaySaveBtn] = useState<boolean>(false); //? 길 저장 버튼 활성화/비활성화
  const [naviDataResult, setNaviDataResult] = useState<Object>({});
  const [myWayDataResult] = useState<Object>({});

  const [time, setTime] = useState<number[]>([]);
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [distance, setDistance] = useState<number[]>([]);

  const mapRef = useRef<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false); //? 모달 상태 제어
  const [naviSearchCounter, setNaviSearchCounter] = useState<number>(0); //? 길찾기 횟수 카운터
  const [currentMyWayNameObj, setCurrentMyWayNameObj] = useState<Object>({
    index: 0,
    name: '',
  }); //? 현재 저장된 길 이름

  const [mongoStart, setMongoStart] = useState('');
  const [mongoWay, setMongoWay] = useState<string[]>([]);
  const [mongoEnd, setMongoEnd] = useState('');

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
  const [startMarker, setStartMarker] = useState<Marker>({
    name: '',
    marker: new window.kakao.maps.Marker({}),
  });
  const [endMarker, setEndMarker] = useState<Marker>({
    name: '',
    marker: new window.kakao.maps.Marker({}),
  });
  const [wayMarkers, setWayMarkers] = useState<Marker[]>([]);
  const [polyLines, setPolyLines] = useState<any[]>([]);

  useEffect(() => {
    console.log(
      '몽고스테이트 값 변경됨',
      '출발 : ',
      mongoStart,
      ', 경유 : ',
      mongoWay,
      ', 도착 : ',
      mongoEnd,
    ); //값이 변할때 mongoState확인
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
    mapRef.current.setLevel(5); // 경로 안내 클릭시 지도 범위 변경
    if (globalVar.wayPoint.length === 0) {
      url = `https://apis-navi.kakaomobility.com/v1/directions?priority=DISTANCE&car_type=7&car_fuel=GASOLINE&origin=${globalVar.startPoint[1]}%2C${globalVar.startPoint[0]}&destination=${globalVar.endPoint[1]}%2C${globalVar.endPoint[0]}`;
      console.log('url1: ', url);
      setShowPlaces(false);
    } else {
      const waypointsString = globalVar.wayPoint
        .map((point, index) => {
          if (index % 2 === 0) {
            const nextIndex = index + 1;
            if (nextIndex < globalVar.wayPoint.length) {
              return `${globalVar.wayPoint[nextIndex]}%2C${point}`;
            }
          }
          return null;
        })
        .filter((point) => point !== null)
        .join('%7C');
      url = `https://apis-navi.kakaomobility.com/v1/directions?priority=DISTANCE&car_type=7&car_fuel=GASOLINE&origin=${globalVar.startPoint[1]}%2C${globalVar.startPoint[0]}&destination=${globalVar.endPoint[1]}%2C${globalVar.endPoint[0]}&waypoints=${waypointsString}`;
      console.log('url2: ', url);
      setShowPlaces(false); //검색후 결과값, 버튼 숨김 처리
      transferMongo(
        globalVar.startPoint,
        globalVar.wayPoint,
        globalVar.endPoint,
      );
    }
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
        globalVar.startPoint = [0, 0];
        globalVar.endPoint = [0, 0];
        globalVar.wayPoint = [];

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
              console.log('폴리라인')
              console.dir(polyline)
              console.log(traffic)
              if (
                j ===
                jsonData['routes'][0]['sections'][a]['roads'][i]['vertexes']
                  .length -
                  2
              ) {
                polyline.setMap(mapRef.current);
                polyLines.push(polyline);
              }
            }
          }
        }
        setTime(timeData);
        setDistance(distanceData);
        setWaySaveBtn(true);
        handleButtonClick();
        console.log('값 전달', showDetail);
        globalVar.endPoint = [0, 0];
        globalVar.startPoint = [0, 0];
        globalVar.wayPoint = [];
        setWayCount(0);
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
      `출발지 좌표 : ${globalVar.startPoint}, 경유지 좌표 ${globalVar.wayPoint}, 목적지 좌표 ${globalVar.endPoint}`,
    );
  };

  //출발지 마커
  function handleSelectPlace(place: Place) {
    isPolyLineDrawn(); //polyline이 그려져있는지 확인
    const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
    if (!startMarker.marker.getMap()) {
      startMarker.marker.setPosition(markerPosition);
      startMarker.marker.setImage(MarkerImgSet.setStartMarkerImg());
      startMarker.marker.setZIndex(1);
      startMarker.marker.setMap(mapRef.current);
    } else {
      startMarker.marker.setPosition(markerPosition);
    }

    mapRef.current.setCenter(markerPosition); //해당하는 좌표를 가지고 지도 중심으로 이동시킴
    setSelectedPlace(place);
    globalVar.startPoint = [Number(place.y), Number(place.x)];
    globalVar.isSearchingStart = false;
    console.log(
      `출발지 좌표 : ${globalVar.startPoint}, 경유지 좌표 ${globalVar.wayPoint}, 목적지 좌표 ${globalVar.endPoint}`,
    );
  }
  //도착지 마커
  const handleSelectPlaceEnd = (place: Place) => {
    isPolyLineDrawn(); //polyline이 그려져있는지 확인
    const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
    if (!endMarker.marker.getMap()) {
      endMarker.marker.setPosition(markerPosition);
      endMarker.marker.setImage(MarkerImgSet.setEndMarkerImg());
      endMarker.marker.setZIndex(6);
      endMarker.marker.setMap(mapRef.current);
    } else {
      endMarker.marker.setPosition(markerPosition);
    }

    mapRef.current.setCenter(markerPosition); //해당하는 좌표를 가지고 지도 중심으로 이동시킴
    setSelectedPlace(place);
    globalVar.endPoint = [Number(place.y), Number(place.x)];
    globalVar.isSearchingEnd = false;
    console.log(
      `출발지 좌표 : ${globalVar.startPoint}, 경유지 좌표 ${globalVar.wayPoint}, 목적지 좌표 ${globalVar.endPoint}`,
    );
  };
  //경유지 마커
  const handleSelectPlaceWay = (place: Place) => {
    isPolyLineDrawn(); //polyline이 그려져있는지 확인
    //경유지 5개로 설정
    if (wayCount === 0) {
      wayMarkers.forEach((marker) => {
        marker.marker.setMap(null);
      });
      setWayMarkers([]);
    }
    if (wayCount < 5) {
      const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
      const markerWay = new window.kakao.maps.Marker({
        position: markerPosition,
        map: mapRef.current,
        image: MarkerImgSet.setWaypointMarkerImg(),
      });
      const markerWayObj = {
        name: place.name,
        marker: markerWay,
      };
      wayMarkers.push(markerWayObj);
      markerWay.setMap(mapRef.current);
      mapRef.current.setCenter(markerPosition);
      setSelectedPlace(place);
      globalVar.wayPoint.push(Number(place.y));
      globalVar.wayPoint.push(Number(place.x));
      console.log(
        `출발지 좌표 : ${globalVar.startPoint}, 경유지 좌표 ${globalVar.wayPoint}, 목적지 좌표 ${globalVar.endPoint}`,
      );
      setWayCount(wayCount + 1);
    } else {
      alert('경유지는 5개까지만 설정 가능합니다.');
    }
  };

  const startNaviSearch = () => {
    setNaviSearchCounter(naviSearchCounter + 1);
    console.log(naviSearchCounter);
  };
  useEffect(() => {
    if (naviSearchCounter > 0) {
      handleNavi();
    }
  }, [naviSearchCounter]);
  function handleDefaultSearch() {
    setCurrentMyWayNameObj({ index: 0, name: '' });
    handleNavi();
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

  function isPolyLineDrawn() {
    if (polyLines.length > 0) {
      polyLines.forEach((polyLine) => {
        polyLine.setMap(null);
      });
      setPolyLines([]);
    }
  }

  return (
    <div>
      <div id="mapContainer" style={{ position: 'relative' }}>
        <div id="map" className="MapNormalSize"></div>
        <div
          style={{
            position: 'absolute',
            top: '10px',
            zIndex: '1',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
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
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ width: '40%' }}
              onKeyDown={(e) => {
                //Enter로 검색 가능
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button onClick={handleSearch}>🔍</button>
          </div>
          {showPlaces && (
            <div
              style={{
                width: '75%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              {places.map((place) => (
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
                      onClick={() => handleSelectPlace(place)}
                      style={{ color: 'blue' }}
                    >
                      출발지
                    </button>
                    <button
                      onClick={() => {
                        handleSelectPlaceEnd(place); //출발지의 장소
                        setKeyword(place.name); //클릭한 장소의 이름이 input으로 전송
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
            </div>
          )}
        </div>
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
        <SaveWayModal onClose={closeModal} />
      </Modal>
      {minute !== 0 && second !== 0 ? (
        <div className="timer" style={{ zIndex: '2', marginTop: '10px' }}>
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
      <div id="result"></div>
    </div>
  );
};

export default KakaoMap;

import React, { useEffect, useState, useRef, useContext } from 'react';
import Modal, { Styles } from 'react-modal';
import './Main.css';
import globalVar from './Global';
import SaveWayModal from './SaveWayModal';

import { MyWayContext } from './MyWayContext';

interface Place {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface ShowDetail {
  onButtonClicked: () => void;
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
    padding: '0'
  },
};

const KakaoMap:React.FC<ShowDetail> = ({onButtonClicked}) => {

  const handleButtonClick = () => {
    // 버튼이 클릭되었을 때, MyWayDetail을 보여주기 위해 상위 컴포넌트(MainPage)로 이벤트를 전달
    onButtonClicked();
  };

  const { showDetail, setShowDetail } = useContext(MyWayContext); //? 컨텍스트

  const [keyword, setKeyword] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const [wayCount, setWayCount] = useState<number>(0); //? 경유지 제한
  const [showPlaces, setShowPlaces] = useState(true); //? 길 리스트 숨김 처리
  const [waySaveBtn, setWaySaveBtn] = useState<boolean>(false); //? 길 저장 버튼 활성화/비활성화

  const [time, setTime] = useState<number[]>([]);
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [distance, setDistance] = useState<number[]>([]);

  const mapRef = useRef<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);  //? 모달 상태 제어

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  let geocoder = new window.kakao.maps.services.Geocoder();

  let startMarker = new window.kakao.maps.Marker(), // 출발지 위치를 표시할 마커.
    startInfowindow = new window.kakao.maps.InfoWindow({ zindex: 1 }); // 출발지에 대한 주소를 표시할 인포윈도우
  let endMarker = new window.kakao.maps.Marker(), // 목적지 위치를 표시할 마커.
    endInfowindow = new window.kakao.maps.InfoWindow({ zindex: 6 }); // 목적지에 대한 주소를 표시할 인포윈도우

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
        const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
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

  function setClickEvents(mouseEvent: { latLng: any }) {
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
            startMarker.setMap(mapRef.current);

            // 인포윈도우에 클릭한 위치에 대한 상세 주소정보를 표시
            window.kakao.maps.event.addListener(
              startMarker,
              'click',
              function () {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다

                startInfowindow.setContent(content);
                if (startInfowindow.getMap() === null) {
                  startInfowindow.open(mapRef.current, startMarker);
                } else {
                  startInfowindow.close();
                }
              },
            );
            globalVar.startPoint = [
              mouseEvent.latLng.getLat(),
              mouseEvent.latLng.getLng(),
            ];
            console.log(
              `출발지 좌표 : ${globalVar.startPoint}, 목적지 좌표 ${globalVar.endPoint}`,
            );

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
            endMarker.setMap(mapRef.current);

            // 인포윈도우에 클릭한 위치에 대한 상세 주소정보를 표시
            window.kakao.maps.event.addListener(
              endMarker,
              'click',
              function () {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                endInfowindow.setContent(content);
                if (endInfowindow.getMap() === null) {
                  endInfowindow.open(mapRef.current, endMarker);
                } else {
                  endInfowindow.close();
                }
              },
            );

            globalVar.endPoint = [
              mouseEvent.latLng.getLat(),
              mouseEvent.latLng.getLng(),
            ];
            console.log(
              `출발지 좌표 : ${globalVar.startPoint}, 목적지 좌표 ${globalVar.endPoint}`,
            );

            // 목적지 지정 이후, 전역변수를 false로 설정.
            globalVar.isSearchingEnd = false;
          }
        },
      );
    }

    // 좌표로 상세 주소 정보를 요청하는 콜백함수
    function searchDetailAddrFromCoords(
      coords: { getLng: any; getLat: any },
      callback: Function,
    ) {
      // geocoder를 통해 좌표로 상세 주소 정보를 요청
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    if (globalVar.isSearchingStart) {
      // 맵에서 출발지 마커를 찍어주는 함수 실행.
      onClickSetStartPoint(mouseEvent);
    } else if (globalVar.isSearchingEnd) {
      onClickSetEndPoint(mouseEvent);
    }
  }

  // 클릭 이벤트 분리
  useEffect(() => {
    window.kakao.maps.event.addListener(
      mapRef.current,
      'click',
      setClickEvents,
    );
  }, []);

  // 경로안내 버튼 클릭 시 지정된 출발지/도착지 정보를 가지고 최단거리 산출
  const handleNavi = () => {
    let url;
    mapRef.current.setLevel(5); // 경로 안내 클릭시 지도 범위 변경
    if (globalVar.wayPoint.length === 0) {
      url = `https://apis-navi.kakaomobility.com/v1/directions?priority=DISTANCE&car_type=7&car_fuel=GASOLINE&origin=${globalVar.startPoint[1]}%2C${globalVar.startPoint[0]}&destination=${globalVar.endPoint[1]}%2C${globalVar.endPoint[0]}`;
      console.log('url1: ', url);
      setShowPlaces(false); //검색후 결과값, 버튼 숨김 처리
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

        // 응답 데이터에서 roads 데이터만 추출
        const roadData = jsonData['routes'][0]['sections'][0]['roads'];
        const timeData: number[] = [];
        const distanceData: number[] = [];
        console.log('roadData : ', roadData);

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
                polyline.setMap(mapRef.current);
              }
            }
          }
        }
        setTime(timeData);
        setDistance(distanceData);
        setWaySaveBtn(true);
        handleButtonClick()
        console.log('값 전달', showDetail)
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
  const handleSelectPlace = (place: Place) => {
    const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
    const markerStart = new window.kakao.maps.Marker({
      position: markerPosition,
      map: mapRef.current,
      icon: new window.kakao.maps.MarkerImage(
        'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png', //마커
        new window.kakao.maps.Size(22, 22),
        {
          offset: new window.kakao.maps.Point(11, 11),
        },
      ),
    });
    setSelectedPlace(place);
    globalVar.startPoint = [Number(place.y), Number(place.x)];
    globalVar.isSearchingStart = false;
    console.log(
      `출발지 좌표 : ${globalVar.startPoint}, 경유지 좌표 ${globalVar.wayPoint}, 목적지 좌표 ${globalVar.endPoint}`,
    );
  };

  const handleSelectPlaceEnd = (place: Place) => {
    const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
    const markerEnd = new window.kakao.maps.Marker({
      position: markerPosition,
      map: mapRef.current,
      icon: new window.kakao.maps.MarkerImage(
        'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png', //마커
        new window.kakao.maps.Size(22, 22),
        {
          offset: new window.kakao.maps.Point(11, 11),
        },
      ),
    });
    mapRef.current.setCenter(markerPosition);
    setSelectedPlace(place);
    globalVar.endPoint = [Number(place.y), Number(place.x)];
    globalVar.isSearchingEnd = false;
    console.log(
      `출발지 좌표 : ${globalVar.startPoint}, 경유지 좌표 ${globalVar.wayPoint}, 목적지 좌표 ${globalVar.endPoint}`,
    );
  };
  const handleSelectPlaceWay = (place: Place) => {
    //경유지 5개로 설정
    if (wayCount < 5) {
      const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
      const markerWay = new window.kakao.maps.Marker({
        position: markerPosition,
        map: mapRef.current,
        icon: new window.kakao.maps.MarkerImage(
          'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png', //마커
          new window.kakao.maps.Size(22, 22),
          {
            offset: new window.kakao.maps.Point(11, 11),
          },
        ),
      });
      mapRef.current.setCenter(markerPosition);
      setSelectedPlace(place);
      globalVar.wayPoint.push(Number(place.y))
      globalVar.wayPoint.push(Number(place.x))
      console.log(
        `출발지 좌표 : ${globalVar.startPoint}, 경유지 좌표 ${globalVar.wayPoint}, 목적지 좌표 ${globalVar.endPoint}`,
      );
      setWayCount(wayCount + 1);
    }
  };

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
              transform: 'translateX(-5%)'
            }}
          >
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ width: '40%' }}
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
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                zIndex: '3',
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
                      onClick={() => handleSelectPlace(place)}
                      style={{ color: 'green' }}
                    >
                      출발지
                    </button>
                    <button
                      onClick={() => handleSelectPlaceEnd(place)}
                      style={{ color: 'red' }}
                    >
                      목적지
                    </button>
                    <button
                      onClick={() => handleSelectPlaceWay(place)}
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
          {waySaveBtn ? <button onClick={openModal} style={{padding: '5px'}}>경로 저장</button> : <div></div>}
          <button onClick={handleNavi} style={{padding: '5px', marginLeft: '5px'}}>경로 안내</button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Login Modal"
      >
        <SaveWayModal onClose = {closeModal}/>
      </Modal>
      {minute !== 0 && second !== 0 ? (
        <div className="timer" style={{ zIndex: '2' }}>
          <img
            src={process.env.PUBLIC_URL + '/resource/timer.png'}
            className="timerImg"
            alt="timerImg"
          />{' '}
          {hour !== 0 ? hour + '시간 ' : ''}
          {minute}분 {second}초
        </div>
      ) : (
        <div style={{ display: 'none' }}></div>
      )}
      <div id="result"></div>
    </div>
  );
}

export default KakaoMap;

/**
 * 크기정보를 담고 있는 사이즈 객체를 생성한다.
 * @param width {number} - 가로 크기
 * @param height {number} - 세로 크기
 * @see https://apis.map.kakao.com/web/documentation/#Size
 * @example
 * ```ts
 * const size = new window.kakao.maps.Size(33.450701, 126.570667);
 * ```
 */
type KakaoMapSize = {
  width: number;
  height: number;
};

/**
 
 * 좌표 정보를 담고 있는 포인트 객체를 생성한다.
 * @param x {number} - x 좌표
 * @param y {number} - y 좌표
 * @returns
 * @constructor
 * @see https://apis.map.kakao.com/web/documentation/#Point
 * @example
 * ```ts
 * const point = new window.kakao.maps.Point(33.450701, 126.570667);
 * ```
 */
type KakaoMapPoint = {
  x: number;
  y: number;
};

/**
 * 마커의 이미지정보를 가지고 있는 마커이미지 객체를 생성한다.
 * @param src {string} - 마커이미지의 주소
 * @param size {Size} - 마커이미지의 크기
 * @param options {MarkerImageOptions} - 마커이미지의 옵션
 * @see https://apis.map.kakao.com/web/documentation/#MarkerImage
 * @example
 * ```ts
 * const imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
 * const imageSize = new window.kakao.maps.Size(24, 35);
 * const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
 * ```
 * @example
 * ```ts
 * const imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
 * const imageSize = new window.kakao.maps.Size(24, 35);
 * const imageOption = {offset: new window.kakao.maps.Point(27, 69)};
 * const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
 * ```
 */
type KakaoMapMarkerImage = {
  src: string; // 이미지 주소
  size: KakaoMapSize; // 마커의 크기
  options: {
    alt: string; // 마커 이미지의 alt 속성값을 정의한다.
    coords: string; // 마커의 클릭 또는 마우스오버 가능한 영역을 표현하는 좌표값
    offset: KakaoMapPoint; // 마커의 좌표에 일치시킬 이미지 안의 좌표 (기본값: 이미지의 가운데 아래)
    shape: string; // 마커의 클릭 또는 마우스오버 가능한 영역의 모양
    spriteOrigin: KakaoMapPoint; // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
    spriteSize: KakaoMapSize; // 스프라이트 이미지의 전체 크기window.kakao.maps.MarkerImage;
  };
};
/**
 * 출발지 마커 이미지를 설정한다.
 * @returns {KakaoMapMarkerImage} - 출발지 마커이미지를 가진 객체
 * @see https://apis.map.kakao.com/web/documentation/#MarkerImage
 */
function setStartMarkerImg(): KakaoMapMarkerImage {
  let img = new window.kakao.maps.MarkerImage(
    process.env.PUBLIC_URL + '/resource/marker/startpointMarker.png',
    new window.kakao.maps.Size(20, 30),
    {
      offset: new window.kakao.maps.Point(10, 30),
    },
  );
  return img;
}

/**
 * 도착지 마커 이미지를 설정한다.
 * @returns {KakaoMapMarkerImage} - 도착지 마커이미지를 가진 객체
 * @see https://apis.map.kakao.com/web/documentation/#MarkerImage
 */
function setEndMarkerImg(): KakaoMapMarkerImage {
  let img = new window.kakao.maps.MarkerImage(
    process.env.PUBLIC_URL + '/resource/marker/endpointMarker.png',
    new window.kakao.maps.Size(20, 30),
    {
      offset: new window.kakao.maps.Point(10, 30),
    },
  );
  return img;
}
/**
 * 경유지 마커 이미지를 설정한다.
 * @returns {KakaoMapMarkerImage} - 경유지 마커이미지를 가진 객체
 * @see https://apis.map.kakao.com/web/documentation/#MarkerImage
 */
function setWaypointMarkerImg(): KakaoMapMarkerImage {
  let img = new window.kakao.maps.MarkerImage(
    process.env.PUBLIC_URL + '/resource/marker/waypointMarker.png',
    new window.kakao.maps.Size(20, 30),
    {
      offset: new window.kakao.maps.Point(10, 30),
    },
  );
  return img;
}

/**
 * 마커 이미지를 설정하는 클래스
 * @class
 * @see https://apis.map.kakao.com/web/documentation/#MarkerImage
 * @example
 * ```ts
 * const markerImgSet = new MarkerImgSet();
 * const startMarkerImg = markerImgSet.setStartMarkerImg();
 * const endMarkerImg = markerImgSet.setEndMarkerImg();
 * const waypointMarkerImg = markerImgSet.setWaypointMarkerImg();
 * ```
 */
class MarkerImgSet {
  static setStartMarkerImg = setStartMarkerImg;
  static setEndMarkerImg = setEndMarkerImg;
  static setWaypointMarkerImg = setWaypointMarkerImg;
}

export default MarkerImgSet;

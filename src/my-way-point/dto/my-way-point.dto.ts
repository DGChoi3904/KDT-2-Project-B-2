export class MyWayPointDTO {
  //유저 생성할때 사용되는 데이터전송객체(DTO)

  readonly start: string; //출발지. `String`

  readonly wayName: string; // 즐겨찾기 이름

  readonly wayPoints: Array<string>; // 경유지들. 배열. 최대 5 [wayPoint1, wayPoint2, wayPoint3, wayPoint4, wayPoint5] :  경유지 목록. 좌표가 저장됨 `String`.

  readonly end: string; // string 도착지. `String`

  readonly userId: string; //로그인된 유저의 정보다 담긴 userData 콜렉션에서 userId를 불러옴.
}

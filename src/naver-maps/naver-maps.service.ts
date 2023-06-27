import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverMapsService {
  getMapData(location: string): any {
    // 네이버 지도 API 호출 및 데이터 처리 로직을 구현합니다.
    // 예시로 고정된 데이터를 반환하도록 작성하였습니다.
    const mapData = {
      center: { lat: 36.3501713, lng: 127.3848386 },
      zoom: 17,
    };
    return mapData;
  }
}

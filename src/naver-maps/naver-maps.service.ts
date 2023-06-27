import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverMapsService {
  getMapData(location: string): any {
    // 네이버 맵 API 호출 및 데이터 가공 로직
    // ...
  }
}

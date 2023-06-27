import { Controller, Get, Query } from '@nestjs/common';
import { NaverMapsService } from './naver-maps.service';

@Controller('maps')
export class NaverMapsController {
  constructor(private readonly naverMapService: NaverMapsService) {}

  @Get('data')
  async getMapData(@Query('location') location: string) {
    const mapData = await this.naverMapService.getMapData(location);
    return mapData;
  }
}

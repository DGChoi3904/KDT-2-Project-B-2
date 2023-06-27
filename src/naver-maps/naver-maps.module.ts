import { Module } from '@nestjs/common';
import { NaverMapsController } from './naver-maps.controller';
import { NaverMapsService } from './naver-maps.service';

@Module({
  controllers: [NaverMapsController],
  providers: [NaverMapsService],
})
export class NaverMapsModule {}

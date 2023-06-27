import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NaverMapsController } from './naver-maps/naver-maps.controller';
import { NaverMapsModule } from './naver-maps/naver-maps.module';

@Module({
  imports: [NaverMapsModule],
  controllers: [AppController, NaverMapsController],
  providers: [AppService],
})
export class AppModule {}

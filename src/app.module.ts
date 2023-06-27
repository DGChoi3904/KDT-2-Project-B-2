import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NaverMapsModule } from './naver-maps/naver-maps.module';

@Module({
  imports: [NaverMapsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

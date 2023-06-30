import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { FallbackModule } from './fallback/fallback.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dvover931:1234@cluster0.p7kbkbj.mongodb.net/cats',
    ),
    CatsModule,
    FallbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

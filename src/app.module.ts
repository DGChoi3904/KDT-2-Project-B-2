import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { FallbackModule } from './fallback/fallback.module';
import { SignupController } from './signup/signup.controller';
import { SignupModule } from './signup/signup.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dvover931:1234@cluster0.p7kbkbj.mongodb.net/cats',
    ),
    MongooseModule.forRoot(
      'mongodb+srv://dvover931:1234@cluster0.p7kbkbj.mongodb.net/users',
    ),
    CatsModule,
    FallbackModule,
    SignupModule,
  ],
  controllers: [AppController, SignupController],
  providers: [AppService],
})
export class AppModule {}

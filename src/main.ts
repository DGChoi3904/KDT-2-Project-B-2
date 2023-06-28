import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', '..', 'client', 'build')); // 정적 파일을 읽어오는 경로 수정
  app.enableCors({
    origin: '*', // 허용할 오리진을 지정
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  }); // 필요한 경우 CORS 설정
  await app.listen(3000);
}
bootstrap();

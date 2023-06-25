import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 정적 파일 제공 설정
  app.useStaticAssets(join(__dirname, '..', 'client', 'build'));

  await app.listen(3000);
}
bootstrap();

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './schemas/cat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])], //몽구스.포피쳐 메소드를 이용하여 캣 모델과 스키마를 등록
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}

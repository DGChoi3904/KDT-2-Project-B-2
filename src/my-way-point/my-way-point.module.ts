import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MyWayPointController } from './my-way-point.controller';
import { MyWayPointService } from './my-way-point.service';
import { MyWayPoint, MyWayPointSchema } from './schema/my-way-point.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MyWayPoint.name, schema: MyWayPointSchema },
    ]),
  ],
  controllers: [MyWayPointController],
  providers: [MyWayPointService],
})
export class MyWayPointModule {}

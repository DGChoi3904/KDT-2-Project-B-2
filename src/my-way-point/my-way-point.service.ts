import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MyWayPoint, MyWayPointDocument } from './schema/my-way-point.schema';
import { MyWayPointDTO } from './dto/my-way-point.dto';

@Injectable()
export class MyWayPointService {
  constructor(
    @InjectModel(MyWayPoint.name)
    private myWayPointModel: Model<MyWayPointDocument>,
  ) {}

  async create(wayPointData: MyWayPointDTO): Promise<MyWayPoint> {
    const newMyWayPoint = new this.myWayPointModel(wayPointData);
    return await newMyWayPoint.save();
  }

  async findByUserId(userId: string): Promise<MyWayPoint[]> {
    return await this.myWayPointModel.find({ userId });
  }
}

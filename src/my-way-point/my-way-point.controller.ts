import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MyWayPointService } from './my-way-point.service';
import { MyWayPointDTO } from './dto/my-way-point.dto';

@Controller('my-way-points')
export class MyWayPointController {
  constructor(private readonly myWayPointService: MyWayPointService) {}

  @Post()
  async create(@Body() wayPointData: MyWayPointDTO): Promise<any> {
    return await this.myWayPointService.create(wayPointData);
  }

  @Get(':userId')
  async findByUserId(@Param('userId') userId: string): Promise<any> {
    return await this.myWayPointService.findByUserId(userId);
  }
}

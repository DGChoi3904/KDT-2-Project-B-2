import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post() //Post방식의 /Cats 요청시 create 서비스 실행
  async create(@Body() createCatDto: CreateCatDto) {
    await this.catsService.create(createCatDto);
  }

  @Get() //Get방식의 /Cats 요청시 findAll 서비스 실행
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('/:id') //Get방식의 /Cats:id 요청시 findOne 서비스 실행
  async findOne(@Param('id') id: string): Promise<Cat | null> {
    return await this.catsService.findOne(id);
  }

  @Delete(':id') //Delete /Cats:id 요청시 delete 서비스 실행
  async delete(@Param('id') id: string) {
    return this.catsService.delete(id);
  }
}

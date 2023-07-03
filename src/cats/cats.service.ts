import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = await this.catModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(str: string): Promise<Cat | null> {
    //findOne의 key자리는 실제 DB의 검색할 key를 입력.
    //현재 _id와 name으로 테스트 가능.
    return this.catModel.findOne({ name: str }).exec();
  }

  async updateOne(id: string, updateCatDto: CreateCatDto): Promise<Cat | null> {
    //findOne 메소드 이후 사용 가능.
    //조회된 데이터의 id를 기준으로 db에서 수정을 함.

    const { name, age, breed } = updateCatDto;
    const updatedCat = await this.catModel
      .findOneAndUpdate({ _id: id }, { name, age, breed }, { new: true })
      .exec();
    return updatedCat;
  }

  async delete(id: string): Promise<Cat | null> {
    const deletedCat = await this.catModel.findByIdAndRemove(id).exec();
    return deletedCat;
  }
}

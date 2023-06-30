import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    //생성
    const createdCat = await this.catModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Cat[]> {
    //전체 조회
    console.log(this.catModel.find(), '파인드올');
    return this.catModel.find().exec();
  }

  async findOne(str: string): Promise<Cat | null> {
    //지정 조회
    //기본 검색 조건은 _id로 설정이 되어있으나 자동생성되는 부분이므로 클라이언트는 알 수없음.
    //_id를 :name으로 변경시 한 객체만 조회가되나, 중복되는 다른 객체들은 무시됨.
    return this.catModel.findOne({ _id: str }).exec();
  }
  async delete(id: string) {
    //삭제
    const deletedCat = await this.catModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}

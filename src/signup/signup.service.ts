import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
@Injectable()
export class SignupService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    //회원가입 서비스
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findUserById(userId: string): Promise<User | null> {
    return this.userModel.findOne({ userId }).exec();
  }

  async findUser(createUserDto: CreateUserDto): Promise<User | null> {
    const { userId, password } = createUserDto;
    const user = await this.userModel.findOne({ userId, password }).exec();
    return user;
  }
}

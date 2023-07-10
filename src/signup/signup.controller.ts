import {
  Body,
  Controller,
  Request, // 추가된 부분
  Post,
} from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class SignupController {
  constructor(private readonly signupService: SignupService) {} // 수정된 부분

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    await this.signupService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const user = await this.signupService.findUser(createUserDto);
    if (user) {
      console.log(user);
      return { success: true, nickname: user.nickname, userId: user.userId };
    } else {
      return { success: false };
    }
  }
}

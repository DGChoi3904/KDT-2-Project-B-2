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
    // 중복 여부 검사
    const existingUser = await this.signupService.findUserById(
      createUserDto.userId,
    );

    if (!existingUser) {
      // 중복이 아닌 경우에만 회원가입 진행
      await this.signupService.create(createUserDto);
      return { success: true };
    } else {
      // 중복된 userId인 경우
      return { success: false, message: '이미 존재하는 ID입니다.' };
    }
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

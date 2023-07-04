import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';

@Controller('signup')
export class SignupController {
  constructor(private readonly sighupService: SignupService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.sighupService.create(createUserDto);
  }
}

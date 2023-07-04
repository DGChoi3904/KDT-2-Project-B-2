import { Controller, Get, Res, Req } from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';
import { FallbackModuleService } from './fallback.service';

@Controller('fallback')
export class FallbackController {
  constructor(private readonly FallbackModuleService: FallbackModuleService) {}
  @Get('*')
  fallback(@Res() res: any) {
    res.sendFile(this.FallbackModuleService.getBuildPath());
  }
}

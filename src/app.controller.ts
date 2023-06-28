import { Controller, Get, Res, Req, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';
import fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('*')
  serveFile(@Req() req: Request, @Res() res: Response) {
    // const filePath = join(
    //   __dirname,
    //   '..',
    //   '..',
    //   'client',
    //   'build',
    //   'index.html',
    // );
    // return res.sendFile(filePath);
    const filePath = join(
      __dirname,
      '..',
      '..',
      'client',
      'build',
      'index.html',
    );
  }
}

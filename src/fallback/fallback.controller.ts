import { Controller, Get, Res, Req } from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';

@Controller('fallback')
export class FallbackController {
  @Get('*')
  serveFile(@Req() req: Request, @Res() res: Response) {
    const filePath = join(
      __dirname,
      '..',
      '..',
      'client',
      'build',
      'index.html',
    );
    return res.sendFile(filePath);
  }
}

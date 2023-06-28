import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import fetch from 'node-fetch';

@Controller('scripts')
export class NaverMapsController {
  @Get('maps.js')
  async getMapsScript(@Res() res: Response) {
    const script = await fetch(
      `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=hwwivs3rlv`,
    );
    const scriptText = await script.text();

    res.setHeader('Content-Type', 'text/javascript');
    const sendResult = res.send(scriptText);

    // 전송 결과 확인
    console.log('전송 결과:', sendResult);

    // 헤더 전송 여부 확인
    console.log('헤더 전송 여부:', res.headersSent);
  }
}

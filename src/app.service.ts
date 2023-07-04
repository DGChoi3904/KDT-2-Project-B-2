import { Injectable } from '@nestjs/common';
import * as path from 'path';
import fs from 'fs';

@Injectable()
export class AppService {
  getBuildPath(): string {
    // 빌드 된 index.html 경로 제공
    return path.join(__dirname, '..', '..', 'client', 'build', 'index.html');
  }
}

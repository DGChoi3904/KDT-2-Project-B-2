import { Module } from '@nestjs/common';
import { FallbackController } from './fallback.controller';
import { FallbackModuleService } from './fallback.service';

@Module({
  controllers: [FallbackController],
  providers: [FallbackModuleService],
})
export class FallbackModule {}

import { Module } from '@nestjs/common';
import { ZoomService } from './zoom.service';
import { ZoomController } from './zoom.controller';
import { TokenModule } from '../token/token.module';

@Module({
  imports:[TokenModule],
  controllers: [ZoomController],
  providers: [ZoomService],
})
export class ZoomModule {}

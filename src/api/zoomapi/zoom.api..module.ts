import { Module } from '@nestjs/common';
import { TokenModule } from '../token/token.module';
import { ZoomAPiController } from './zoom.api.controller';
import { ZoomApiService } from './zoom.api.service';
import { ZoomModule } from '../zoom/zoom.module';
import { ZoomMeetingService } from 'src/services';

@Module({
  imports: [TokenModule,ZoomModule],
  controllers: [ZoomAPiController],
  providers: [ZoomApiService,ZoomMeetingService],
  exports:[ZoomMeetingService]
})
export class ZoomAPiModule {}

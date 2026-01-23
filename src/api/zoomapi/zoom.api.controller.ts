import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateMeetingDto, RoleGuard } from 'src/common';
import { ZoomApiService } from './zoom.api.service';

@Controller('zoom')
@UseGuards(RoleGuard)
export class ZoomAPiController {
  constructor(private readonly zoomService: ZoomApiService) {}

  @Get('accessToken')
  async getAccessToken(@Req() req: Request) {
    const code = req.query.code;
    if (!code)
      return {
        message: 'Code should be',
      };
    return this.zoomService.getAccessToken(code as string);
  }

  @Post('meeting')
  async createMeeting(@Body() body: CreateMeetingDto) {
    return this.zoomService.createMeeting(body);
  }

  @Get('meeting')
  async getMeeting() {
    return this.zoomService.getMeeting();
  }

  @Patch('meeting/:meetingId')
  async updateMeeting(
    @Body() body: CreateMeetingDto,
    @Param('meetingId') meetingId: number,
  ) {
    return this.zoomService.updateMeeting(body, +meetingId);
  }

  @Delete('meeting/:meetingId')
  async deleteMeeting(@Param('meetingId') meetingId: number) {
    return this.zoomService.deleteMeeting(+meetingId);
  }

  @Get('meeting/:meetingId')
  async getMeetingById(@Param('meetingId') meetingId: number) {
    return this.zoomService.getMeetingById(+meetingId);
  }
}

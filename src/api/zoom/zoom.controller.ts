import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ZoomService } from './zoom.service';
import { Request } from 'express';
import { CreateMeetingDto } from 'src/common';


@Controller('zoom')
// @UseGuards()
export class ZoomController {
  constructor(
    private readonly zoomService: ZoomService
    ) {}

  @Get('api')
  async getFunction(@Req() req:Request){
    const code=req.query.code
    if(!code) return {
      message:"Code should be"
    }
    return this.zoomService.getResult(code as string);
  }

  @Post
  ('zoom')
  async CreateFunction(@Body() body:CreateMeetingDto){
    return this.zoomService.createMeeting(body)
  }

  
 
}

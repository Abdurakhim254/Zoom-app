import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateMeetingDto, UpdateZoomMeetingDto } from 'src/common';
import { ZoomService } from '../zoom/zoom.service';
import { ZoomMeetingService } from 'src/services';

@Injectable()
export class ZoomApiService {
  constructor(
    private readonly zoomService:ZoomService,
    private readonly meetingservice:ZoomMeetingService
  ) {}
async getAccessToken(code: string) {
  const result= await this.meetingservice.getAccessToken(code);

  return {
    result
  }
} 

async createMeeting(body:CreateMeetingDto){
  const meeting= await this.meetingservice.createMeeting(body);
  const result=await this.zoomService.create(meeting);
  return {
    meeting,
    result
  }
}

async getMeeting(){
  
  const meetings=await this.zoomService.findAll();

  const result=await this.meetingservice.getMeetings();

  return {
    meetings,result
  };
}

async deleteMeeting(meetingId:number){

  const [deletedmeeting,result]=await Promise.all([this.meetingservice.deleteMeetingById(meetingId),this.zoomService.remove(meetingId)]);

  return {
    result,deletedmeeting
  };
}

async getMeetingById(meetingId:number){

  const [meeting,result]=await Promise.all([this.meetingservice.getMeetingById(meetingId),this.zoomService.findOneByMeetingId(meetingId)]);

  return {
    meeting,result
  };
}

async updateMeeting(body:UpdateZoomMeetingDto,meetingId:number){

  const [meeting,result]=await Promise.all([this.meetingservice.updateMeetingById(meetingId,body),this.zoomService.update(meetingId,body)]);

  return {
    result,meeting
  };

}


}

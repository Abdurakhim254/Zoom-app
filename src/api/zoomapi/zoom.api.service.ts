import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateMeetingDto, UpdateZoomMeetingDto } from 'src/common';
import { createMeeting, deleteMeetingById, getAccessToken, getMeetingById, getMeetings, updateMeetingById } from 'src/utils';
import { TokenService } from '../token/token.service';
import { ZoomService } from '../zoom/zoom.service';

@Injectable()
export class ZoomApiService {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService:TokenService,
    private readonly zoomService:ZoomService
  ) {}
async getAccessToken(code: string) {
  const res1= await getAccessToken(code,this.configService);

  const res2=await this.tokenService.createAccessToken(res1);

  return {
    res1,res2
  }
} 

async createMeeting(body:CreateMeetingDto){
  const token=await this.tokenService.getAccessToken();
  const meeting= await createMeeting(body,token);
  const result=await this.zoomService.create(meeting);
  return {
    meeting,
    result
  }
}

async getMeeting(){
  const token=await this.tokenService.getAccessToken();
  
  const meetings=await this.zoomService.findAll();

  const result=await getMeetings(token);

  return {
    meetings,result
  };
}

async deleteMeeting(meetingId:number){
  const token=await this.tokenService.getAccessToken();

  const [deletedmeeting,result]=await Promise.all([deleteMeetingById(meetingId,token),this.zoomService.remove(meetingId)]);

  return {
    result,deletedmeeting
  };
}

async getMeetingById(meetingId:number){
  const token=await this.tokenService.getAccessToken();

  const [meeting,result]=await Promise.all([getMeetingById(meetingId,token),this.zoomService.findOneByMeetingId(meetingId)]);

  return {
    meeting,result
  };
}

async updateMeeting(body:UpdateZoomMeetingDto,meetingId:number){
  const token=await this.tokenService.getAccessToken();

  // const [meeting,result]=await Promise.all([updateMeetingById(meetingId,token),this.zoomService.update(meetingId,body)]);

  const result=await updateMeetingById(meetingId,token,body);

  return {
    result
  };

}

}

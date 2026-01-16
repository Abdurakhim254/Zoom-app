import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateMeetingDto, CreateTokenDto } from 'src/common';
import { createMeeting, getAccessToken, getMeetings } from 'src/utils';
import { TokenService } from '../token/token.service';

@Injectable()
export class ZoomService {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService:TokenService
  ) {}
async getResult(code: string) {
  const res1= await getAccessToken(code,this.configService);

  const res2=await this.tokenService.createAccessToken(res1);

  return {
    res1,res2
  }
} 

async createMeeting(body:CreateMeetingDto){
  const token=await this.tokenService.getAccessToken();
  
  const [res1,res2,res3]=await Promise.all([
    getMeetings(this.configService,token),createMeeting(body,this.configService,token),getMeetings(this.configService,token)
  ]);
  return {res1,res2,res3}
}
}

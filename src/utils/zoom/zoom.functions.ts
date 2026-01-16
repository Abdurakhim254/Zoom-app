import { ConfigService } from '@nestjs/config';
import axios from "axios";
import { CreateMeetingDto } from "src/common";
import { getZoomConfig, settings } from "./index";

  
  
export const getMeetings=async(
    configService:ConfigService,token:string
)=>{

    try {

        const response=await axios.get('https://api.zoom.us/v2/users/me/meetings',{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        return response.data
    } catch (error) {
        console.log(error); 
        return error       
    }
}

export const createMeeting=async(
    params:CreateMeetingDto,
    configService:ConfigService,token:string
    )=>{
    try {

        const response=await axios.post('https://api.zoom.us/v2/users/me/meetings',{
            params,
            settings
        },{
            
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
        return error
        
    }
}

export const getAccessToken=async(
    code:string,
    configService:ConfigService
    )=>{
    const config=getZoomConfig(configService);
        
    try {
        const response = await axios.post(
          'https://zoom.us/oauth/token',
          null,
          {
            params:{
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: config.REDIRECT_URL
            },
            headers: {
              'Authorization': `Basic ${Buffer.from(`${config.ZOOM_API_KEY}:${config.ZOOM_API_SECRET}`,).toString('base64')}`,
            },
          },
        );
        
        return {
          message: 'Zoom access and refresh token fetched successfully',
          access_token : response.data.access_token as string,
          refresh_token: response.data.refresh_token as string
        }
        
      } catch (error) {
        console.log(
          error
        );
        throw error;
      }
}
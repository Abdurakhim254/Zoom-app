import { ConfigService } from '@nestjs/config';
import axios from "axios";
import { CreateMeetingDto, UpdateZoomMeetingDto } from "src/common";
import { getZoomConfig, settings } from "./index";


  
export const getMeetings=async(
    token:string
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
    token:string
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
        
        // await refreshToken(response.data.refresh_token);
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

export const getMeetingById=async(
    meetingId:number,
    token:string
    )=>{
    try {
        const response=await axios.get(`https://api.zoom.us/v2/meetings/${meetingId}`,{
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

export const deleteMeetingById=async(
    meetingId:number,
    token:string
    )=>{
    try {
        const response=await axios.delete(`https://api.zoom.us/v2/meetings/${meetingId}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        if(response.status===204){
            return {
                message:'Meeting deleted successfully'
            }
        } 
        return response.data       
    } catch (error) {
        console.log(error);
        return error
    }
}

export const updateMeetingById=async(
    meetingId:number,
    token:string,
    updateMeetingDto:UpdateZoomMeetingDto
    )=>{
    try {
        const response=await axios.patch(`https://api.zoom.us/v2/meetings/${meetingId}`,updateMeetingDto,{
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

// async function refreshToken(refresh_token:string){

//     const response=await axios.post('https://zoom.us/oauth/token',{
//         grant_type:'refresh_token',
//         refresh_token,
//     })
//     return response.data
// }
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { TokenService } from 'src/api/token/token.service';
import { CreateMeetingDto, UpdateZoomMeetingDto } from 'src/common';
import { getZoomConfig, isExpired, settings } from 'src/utils';

@Injectable()
export class ZoomMeetingService {
  constructor(
    private readonly tokenservice: TokenService,
    private readonly configService: ConfigService,
  ) {}
  async getMeetings() {
    try {
      const { access_token } = await this.tokenservice.getAccessToken();
      const response = await axios.get(
        'https://api.zoom.us/v2/users/me/meetings',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async createMeeting(params: CreateMeetingDto) {
    try {
      const { access_token } = await this.tokenservice.getAccessToken();

      const response = await axios.post(
        'https://api.zoom.us/v2/users/me/meetings',
        {
          params,
          settings,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getAccessToken(code: string) {
    const config = getZoomConfig(this.configService);

    try {
      const response = await axios.post('https://zoom.us/oauth/token', null, {
        params: {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: config.REDIRECT_URL,
        },
        headers: {
          Authorization: `Basic ${Buffer.from(`${config.ZOOM_API_KEY}:${config.ZOOM_API_SECRET}`).toString('base64')}`,
        },
      });

      const createdToken = await this.tokenservice.createAccessToken(
        response.data,
      );
      return {
        message: 'Zoom access and refresh token fetched successfully',
        access_token: response.data.access_token as string,
        refresh_token: response.data.refresh_token as string,
        createdToken,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Cron('* 3 * * * *')
  async refreshToken() {
    try {
      const token = await this.tokenservice.getAccessToken();

      const isexpired = isExpired(token.expiresAt);

      if (isexpired) {
        const response = await axios.post('https://zoom.us/oauth/token', null, {
          params: {
            grant_type: 'refresh_token',
            refresh_token: token.refresh_token,
          },
          headers: {
            Authorization: `Basic ${Buffer.from(`${this.configService.get('ZOOM_API_KEY')}:${this.configService.get('ZOOM_API_SECRET')}`).toString('base64')}`,
          },
        });
        await this.tokenservice.createAccessToken(response.data);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async getMeetingById(meetingId: number) {
    try {
      const { access_token } = await this.tokenservice.getAccessToken();

      const response = await axios.get(
        `https://api.zoom.us/v2/meetings/${meetingId}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteMeetingById(meetingId: number) {
    try {
      const { access_token } = await this.tokenservice.getAccessToken();

      const response = await axios.delete(
        `https://api.zoom.us/v2/meetings/${meetingId}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      if (response.status === 204) {
        return {
          message: 'Meeting deleted successfully',
        };
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateMeetingById(
    meetingId: number,
    updateMeetingDto: UpdateZoomMeetingDto,
  ) {
    try {
      const { access_token } = await this.tokenservice.getAccessToken();

      const response = await axios.patch(
        `https://api.zoom.us/v2/meetings/${meetingId}`,
        updateMeetingDto,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

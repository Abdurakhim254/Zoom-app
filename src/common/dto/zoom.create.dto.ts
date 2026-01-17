import { IsString, IsNumber, IsOptional, IsObject, IsEmail } from 'class-validator';

export class CreateZoomMeetingDto {
  @IsString()
  uuid: string;

  @IsNumber()
  id: number;

  @IsString()
  host_id: string;

  @IsEmail()
  host_email: string;

  @IsString()
  topic: string;

  @IsNumber()
  type: number;

  @IsString()
  start_time: string;

  @IsNumber()
  duration: number;

  @IsString()
  timezone: string;

  @IsString()
  created_at: string;

  @IsString()
  join_url: string;

  @IsOptional()
  @IsString()
  start_url?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  h323_password?: string;

  @IsOptional()
  @IsString()
  pstn_password?: string;

  @IsOptional()
  @IsString()
  encrypted_password?: string;

  @IsObject()
  settings: Record<string, any>;
}

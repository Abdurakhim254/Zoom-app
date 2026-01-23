import {
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateMeetingDto {
  @IsString()
  topic: string;

  @IsDateString()
  @IsOptional()
  start_time: string;

  @IsNumber()
  @IsIn([1, 2, 3])
  type: number;

  @IsNumber()
  duration: number;

  @IsString()
  timezone: string;

  @IsOptional()
  @IsString()
  agenda?: string;
}

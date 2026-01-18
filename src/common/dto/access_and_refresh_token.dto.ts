import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TokenResponseDto {
  @IsString()
  refresh_token: string;
}

export class CreateTokenDto {

  @IsString()
  access_token: string;

  @IsString()
  refresh_token: string;

  @IsNumber()
  expires_in: number;
}

export class UpdateTokenDto {
  @IsString()
  @IsOptional()
  access_token?: string;

  @IsString()
  @IsOptional()
  refresh_token?: string;

  @IsNumber()
  @IsOptional()
  expires_in?: number;
}

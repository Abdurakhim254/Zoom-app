import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Roles } from '../enums';

export class AuthRegisterdto {
  @IsString()
  username: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsStrongPassword()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(Roles)
  role: Roles;
}

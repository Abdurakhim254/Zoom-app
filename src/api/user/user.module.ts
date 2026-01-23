import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from 'src/core';
import { MongooseModule } from '@nestjs/mongoose';
import { BcryptService } from 'src/infrastructure';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UserService, BcryptService],
  providers: [UserService, BcryptService],
})
export class UserModule {}

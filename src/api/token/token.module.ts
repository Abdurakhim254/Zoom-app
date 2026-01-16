import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { Token, TokenSchema } from 'src/core';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema}])],
  exports: [TokenService],
  providers: [TokenService],
})
export class TokenModule {}

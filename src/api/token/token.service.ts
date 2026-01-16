import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTokenDto } from 'src/common';
import {  Token} from 'src/core';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<Token>,
  ){}

  async createAccessToken(params:CreateTokenDto){
    
    await this.tokenModel.deleteMany({})
    
    const result=await this.tokenModel.create(params)
    
    return result

  }

  async getAccessToken(){
    const result=await this.tokenModel.findOne()

    return result.access_token
  }
}

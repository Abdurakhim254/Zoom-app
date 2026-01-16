import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthLoginDto, AuthRegisterdto } from 'src/common';
import { User } from 'src/core';
import { BcryptService } from 'src/infrastructure';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly bcryptservice: BcryptService,
  ) {}

  async create(createAuthDto: AuthRegisterdto) {
    const oldUser = await this.getUserByemail(createAuthDto.email);

    if (oldUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await this.bcryptservice.hashPassword(
      createAuthDto.password,
    );

    const user = new this.userModel({
      email: createAuthDto.email,
      password: hashedPassword,
      username: createAuthDto.username,
      role: createAuthDto?.role,
    });

    return user.save();
  }

  async getUserByemail(email: string) {
    return this.userModel.findOne({ email });
  }

  async login(loginAuthdto: AuthLoginDto) {
    const user = await this.getUserByemail(loginAuthdto.email);
    if (!user) {
      throw new NotFoundException('Email or password is incorrect');
    }

    const isPasswordMatch = await this.bcryptservice.comparePassword(
      loginAuthdto.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new NotFoundException('Email or password is incorrect');
    }

    return user;
  }
}

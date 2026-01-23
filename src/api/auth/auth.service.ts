import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TokenService } from 'src/services';
import { AuthLoginDto, AuthRegisterdto, TokenResponseDto } from 'src/common';
import { getPayload } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: TokenService,
  ) {}
  async register(createAuthDto: AuthRegisterdto) {
    const result = await this.userService.create(createAuthDto);
    return result;
  }

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.userService.login(authLoginDto);

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.createAccessToken(payload),
      this.jwtService.createRefreshToken(payload),
    ]);
    return {
      message: 'User logged in successfully',
      access_token,
      refresh_token,
    };
  }

  async refresh(refreshTokenDto: TokenResponseDto) {
    const oldload = await this.jwtService.verifyRefreshToken(
      refreshTokenDto.refresh_token,
    );

    const payload = getPayload(oldload);

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.createAccessToken(payload),
      this.jwtService.createRefreshToken(payload),
    ]);

    return {
      message: 'Token refreshed successfully',
      access_token,
      refresh_token,
    };
  }
}

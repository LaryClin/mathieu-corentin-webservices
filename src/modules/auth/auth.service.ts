import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      return null;
    }

    if (!user.password) {
      return null;
    }
    console.log(
      `Comparing login password (${loginDto.password}) with user password (${user.password})`,
    );

    if (await bcrypt.compare(loginDto.password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(login: LoginDto) {
    const payload = {
      email: login.email,
    };

    console.log('WSH ALORS', this.jwtService.sign(payload));

    return {
      ...login,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

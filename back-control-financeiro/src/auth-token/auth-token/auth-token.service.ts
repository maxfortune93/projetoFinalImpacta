import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthTokenService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneWithUserName(email);
    if (user && (await this.comparePasswords(password, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDto: CreateUserDto) {
    // const result = await this.validateUser(userDto);
    const payload = {
      userEmail: userDto.email,
      sub: {
        name: userDto.name,
      },
    };
    return {
      name: userDto.name,
      accessToken: this.jwtService.sign(payload),
    };
  }
}

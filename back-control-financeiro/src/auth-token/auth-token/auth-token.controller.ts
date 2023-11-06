import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersService } from '../../users/users.service';
import { AuthTokenService } from './auth-token.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtGuard } from '../guards/jwt-auth.guard';

@Controller('auth-token')
export class AuthTokenController {
  constructor(
    private authTokenService: AuthTokenService,
    private userService: UsersService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authTokenService.login(req.user);
  }

  @UseGuards(JwtGuard)
  @Post('protected')
  async protectedRoute(@Request() req) {
    return req.user;
  }

  // Login Sem AuthGuard
  // @Post('login')
  // async login(@Body() createUserDto: CreateUserDto) {
  //   return await this.authTokenService.login(createUserDto);
  // }
}

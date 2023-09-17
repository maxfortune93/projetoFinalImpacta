import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthTokenService } from '../auth-token/auth-token.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authTokenService: AuthTokenService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authTokenService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

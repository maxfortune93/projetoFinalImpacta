import { Module } from '@nestjs/common';
import { AuthTokenService } from './auth-token/auth-token.service';

@Module({
  providers: [AuthTokenService],
})
export class AuthTokenModule {}

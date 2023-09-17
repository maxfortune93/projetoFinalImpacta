import { Module } from '@nestjs/common';
import { AuthTokenService } from './auth-token/auth-token.service';
import { AuthTokenController } from './auth-token/auth-token.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LocalStrategy } from './strategies/local-strategy';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  providers: [
    AuthTokenService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    PrismaService,
  ],
  controllers: [AuthTokenController],
  imports: [
    JwtModule.register({
      secret: `${process.env.jwt_secret}`,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
})
export class AuthTokenModule {}

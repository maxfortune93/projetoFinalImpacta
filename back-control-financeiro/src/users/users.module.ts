import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthTokenService } from '../auth-token/auth-token/auth-token.service';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AuthTokenService, JwtService],
  imports: [],
})
export class UsersModule {}

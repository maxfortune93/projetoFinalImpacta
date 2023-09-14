import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { AuthTokenService } from 'src/auth-token/auth-token/auth-token.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AuthTokenService],
})
export class UsersModule {}

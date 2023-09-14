import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthTokenModule } from './auth-token/auth-token.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthTokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

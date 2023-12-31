import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// import { AuthTokenService } from 'src/auth-token/auth-token/auth-token.service';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService, // private readonly authTokenservice: AuthTokenService,
  ) {}

  async hashPassword(password: string) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      const { name, email, password } = createUserDto;
      const respPass = await this.hashPassword(password);
      const result = await this.prismaService.user.create({
        data: {
          name,
          password: respPass,
          email,
        },
      });
      const payload = {
        userEmail: result.email,
        sub: {
          name: result.name,
        },
      };
      return {
        name: result.name,
        accessToken: this.jwtService.sign(payload),
      };
    }
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneWithUserName(userEmail: string) {
    return await this.prismaService.user.findUnique({
      where: { email: userEmail },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}

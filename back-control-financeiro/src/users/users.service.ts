import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { AuthTokenService } from 'src/auth-token/auth-token/auth-token.service';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthTokenService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      const { name, email, password } = createUserDto;
      const respPass = await this.authService.hashPassword(password);
      return this.prismaService.user.create({
        data: {
          name,
          password: respPass,
          email,
        },
      });
    }
  }

  async login(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const respPass = await this.authService.hashPassword(password);
    return this.prismaService.user.create({
      data: {
        name,
        password: respPass,
        email,
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
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

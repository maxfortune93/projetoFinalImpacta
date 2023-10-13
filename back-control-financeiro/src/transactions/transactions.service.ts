import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TransactionsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UsersService,
  ) {}
  async create(createTransactionDto: CreateTransactionDto, userEmail: any) {
    try {
      console.log('no service', userEmail);
      const getUser = await this.userService.findOneWithUserName(userEmail);
      const { title, amount, type, category, createdAt } = createTransactionDto;
      if (getUser) {
        const result = await this.prismaService.transaction.create({
          data: {
            title,
            amount,
            type,
            category,
            createdAt,
            userId: getUser.id,
          },
        });

        return { message: 'success', result, userEmail };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(userEmail: any) {
    try {
      const getUser = await this.userService.findOneWithUserName(userEmail);
      if (getUser) {
        const result = await this.prismaService.transaction.findMany({
          where: { userId: getUser.id },
        });

        return { message: 'success', transactions: result };
      }
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    return this.prismaService.transaction.findUnique({ where: { id } });
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return await this.prismaService.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  async remove(id: number) {
    await this.prismaService.transaction.delete({
      where: { id },
    });
    return { message: 'Item deletado com sucesso' };
  }
}

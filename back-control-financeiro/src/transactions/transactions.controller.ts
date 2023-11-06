import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtGuard } from 'src/auth-token/guards/jwt-auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
    const userEmail = req.user.name;
    console.log({ userEmail, teste: req.user.name });
    return this.transactionsService.create(createTransactionDto, userEmail);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    const userEmail = req.user.name;
    return this.transactionsService.findAll(userEmail, page, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}

import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsNotEmpty()
  amount: number;
  @IsString()
  @IsNotEmpty()
  type: string;
  @IsString()
  @IsNotEmpty()
  category: string;
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
  @IsNumber()
  @IsNotEmpty()
  userId?: number;
  @IsString()
  @IsNotEmpty()
  userEmail: string;
}

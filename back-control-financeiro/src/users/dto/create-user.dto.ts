import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @MaxLength(255)
  @IsString()
  @IsOptional()
  name?: string | null;

  @MaxLength(255)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(255)
  @IsNotEmpty()
  password: string;

  @MaxLength(255)
  @IsNotEmpty()
  confirmPassword?: string | null;
}

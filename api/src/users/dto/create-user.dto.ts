import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'uvnx@mail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+33600000000' })
  @IsPhoneNumber('FR')
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '123' })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastname: string;
}

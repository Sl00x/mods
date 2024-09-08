import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateModDto {
  @ApiProperty({
    description: 'Name of the mod',
    example: 'High-Resolution Textures',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the mod',
    example: 'A mod that provides high-resolution textures for the game.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Documentation for the mod',
    example: 'text',
  })
  @IsString()
  @IsNotEmpty()
  doc: string;

  @ApiProperty({
    description: 'Indicates if the mod is free or paid',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isFree: boolean;

  @ApiProperty({
    description: 'Indicates if the mod requires a license key',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  withLicenseKey: boolean;

  @ApiProperty({
    description: 'Price of the mod if it is not free',
    example: 9.99,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({
    description: 'Game id',
  })
  @IsString()
  @IsUUID()
  gameId: string;
  authorId: string;
}

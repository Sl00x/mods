import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateGameDto {
  @ApiProperty({
    description: 'Name of the game',
    example: 'Super Mario',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the game',
    example: 'An adventure game with Mario.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "Tableau d'UUIDs",
    type: [String], // Indique que c'est un tableau de strings
    format: 'uuid', // Spécifie le format UUID pour Swagger
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174001',
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  ids: string[];

  image: string;
}

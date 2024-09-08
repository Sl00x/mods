import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({
    description: 'Name of the game',
    example: 'Super Mario',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Platform of the game',
    example: 'Nintendo Switch',
  })
  @IsString()
  @IsNotEmpty()
  plateform: string;

  @ApiProperty({
    description: 'Description of the game',
    example: 'An adventure game with Mario.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

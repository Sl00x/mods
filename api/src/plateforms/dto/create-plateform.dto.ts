import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlateformDto {
  @ApiProperty({
    description: 'Name of the plateform',
    example: 'PC',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

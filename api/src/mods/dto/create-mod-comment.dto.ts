import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModCommentDto {
  @ApiProperty({
    description: 'Content of the comment',
    example: 'This mod is really amazing !',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}

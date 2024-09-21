import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class CreateModReviewDto {
  @ApiProperty({
    description: 'Note of the review',
    example: 4,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  @Max(5)
  note: number;
}

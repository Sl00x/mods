import { PartialType } from '@nestjs/swagger';
import { CreatePlateformDto } from './create-plateform.dto';

export class UpdatePlateformDto extends PartialType(CreatePlateformDto) {}

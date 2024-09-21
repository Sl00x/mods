import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePlateformDto } from './dto/create-plateform.dto';
import { UpdatePlateformDto } from './dto/update-plateform.dto';
import { PlateformsService } from './plateforms.service';

@Controller('plateforms')
@ApiTags('Plateforms')
export class PlateformsController {
  constructor(private readonly plateformsService: PlateformsService) {}

  @Post()
  create(@Body() createPlateformDto: CreatePlateformDto) {
    return this.plateformsService.create(createPlateformDto);
  }

  @Get()
  findAll() {
    return this.plateformsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plateformsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlateformDto: UpdatePlateformDto,
  ) {
    return this.plateformsService.update(id, updatePlateformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plateformsService.remove(id);
  }
}

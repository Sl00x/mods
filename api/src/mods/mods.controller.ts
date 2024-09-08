import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ModsService } from './mods.service';
import { CreateModDto } from './dto/create-mod.dto';
import { UpdateModDto } from './dto/update-mod.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Secured } from 'src/auth/auth.constant';
import { AuthenticatedRequest } from 'interfaces/request.interface';

@Controller('mods')
@ApiTags('Mods')
export class ModsController {
  constructor(private readonly modsService: ModsService) {}

  @Post()
  @ApiBearerAuth('jwt')
  @Secured()
  create(@Req() req: AuthenticatedRequest, @Body() createModDto: CreateModDto) {
    return this.modsService.create({ ...createModDto, authorId: req.user.id });
  }

  @Get()
  findAll() {
    return this.modsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('jwt')
  @Secured()
  update(@Param('id') id: string, @Body() updateModDto: UpdateModDto) {
    return this.modsService.update(id, updateModDto);
  }

  @Delete(':id')
  @ApiBearerAuth('jwt')
  @Secured()
  remove(@Param('id') id: string) {
    return this.modsService.remove(id);
  }
}

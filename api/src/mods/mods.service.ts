import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Mod } from './entities/mod.entity';
import { CreateModDto } from './dto/create-mod.dto';
import { UpdateModDto } from './dto/update-mod.dto';

@Injectable()
export class ModsService {
  constructor(
    @InjectRepository(Mod)
    private readonly repository: Repository<Mod>,
  ) {}

  create(createDto: CreateModDto) {
    return this.repository.save(createDto);
  }

  findAll(options?: FindManyOptions<Mod>) {
    if (!options) return this.repository.find();
    return this.repository.find(options);
  }

  findOne(options: string | FindManyOptions<Mod>) {
    if (typeof options === 'string') {
      return this.repository.findOne({ where: { id: options } });
    } else {
      return this.repository.findOne(options);
    }
  }

  update(id: string, updateDto: UpdateModDto) {
    return this.repository.update(id, updateDto);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreatePlateformDto } from './dto/create-plateform.dto';
import { UpdatePlateformDto } from './dto/update-plateform.dto';
import { Plateform } from './entities/plateform.entity';

@Injectable()
export class PlateformsService {
  constructor(
    @InjectRepository(Plateform)
    private readonly repository: Repository<Plateform>,
  ) {}

  create(createDto: CreatePlateformDto) {
    return this.repository.save(createDto);
  }

  findAll(options?: FindManyOptions<Plateform>) {
    if (!options) return this.repository.find();
    return this.repository.find(options);
  }

  findOne(options: string | FindManyOptions<Plateform>) {
    if (typeof options === 'string') {
      return this.repository.findOne({ where: { id: options } });
    } else {
      return this.repository.findOne(options);
    }
  }

  update(id: string, updateDto: UpdatePlateformDto) {
    return this.repository.update(id, updateDto);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}

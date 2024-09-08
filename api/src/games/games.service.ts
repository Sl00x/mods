import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  create(createGameDto: CreateGameDto) {
    return this.gameRepository.save(createGameDto);
  }

  findAll(options?: FindManyOptions<Game>) {
    if (!options) return this.gameRepository.find();
    return this.gameRepository.find(options);
  }

  findOne(options: string | FindManyOptions<Game>) {
    if (typeof options === 'string') {
      return this.gameRepository.findOne({ where: { id: options } });
    } else {
      return this.gameRepository.findOne(options);
    }
  }

  update(id: string, updateGameDto: UpdateGameDto) {
    return this.gameRepository.update(id, updateGameDto);
  }

  remove(id: string) {
    return this.gameRepository.softDelete(id);
  }
}

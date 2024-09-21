import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { PlateformsService } from 'src/plateforms/plateforms.service';
import { FindManyOptions, Repository } from 'typeorm';
import { createWithManyToManyRelations } from 'utils/repository-global-process';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly plateformService: PlateformsService,
    private readonly httpService: HttpService,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://store.steampowered.com/api/storesearch/?term=${createGameDto.name}&l=english&cc=US`,
      ),
    );
    createGameDto = {
      ...createGameDto,
      image: data['items'][0]
        ? `https://cdn.akamai.steamstatic.com/steam/apps/${data['items'][0]['id']}/header.jpg`
        : null,
    };

    return createWithManyToManyRelations({
      dto: createGameDto,
      dtoKey: 'ids',
      relationKey: 'plateforms',
      relatedService: this.plateformService,
      mainRepository: this.gameRepository,
    });
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

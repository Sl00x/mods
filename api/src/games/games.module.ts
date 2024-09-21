import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlateformsModule } from 'src/plateforms/plateforms.module';
import { Game } from './entities/game.entity';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), PlateformsModule, HttpModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}

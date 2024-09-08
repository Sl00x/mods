import { Module } from '@nestjs/common';
import { ModsService } from './mods.service';
import { ModsController } from './mods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mod } from './entities/mod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mod])],
  controllers: [ModsController],
  providers: [ModsService],
})
export class ModsModule {}

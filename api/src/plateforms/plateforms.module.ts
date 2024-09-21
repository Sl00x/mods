import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plateform } from './entities/plateform.entity';
import { PlateformsController } from './plateforms.controller';
import { PlateformsService } from './plateforms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plateform])],
  controllers: [PlateformsController],
  providers: [PlateformsService],
  exports: [PlateformsService],
})
export class PlateformsModule {}

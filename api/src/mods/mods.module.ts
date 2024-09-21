import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinioClientModule } from 'src/minio/minio.module';
import { ModComment } from './entities/mod-comment.entity';
import { ModPreview } from './entities/mod-preview.entity';
import { ModReview } from './entities/mod-review.entity';
import { ModVersion } from './entities/mod-version.entity';
import { Mod } from './entities/mod.entity';
import { ModsCommentService } from './mods-comment.service';
import { ModsReviewService } from './mods-review.service';
import { ModsController } from './mods.controller';
import { ModsService } from './mods.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Mod,
      ModVersion,
      ModPreview,
      ModReview,
      ModComment,
    ]),
    MinioClientModule,
  ],
  controllers: [ModsController],
  providers: [ModsService, ModsReviewService, ModsCommentService],
})
export class ModsModule {}

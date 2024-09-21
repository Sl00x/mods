import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from 'interfaces/request.interface';
import { Secured } from 'src/auth/auth.constant';
import { MinioClientService } from 'src/minio/minio.service';
import { CreateModCommentDto } from './dto/create-mod-comment.dto';
import { CreateModReviewDto } from './dto/create-mod-review.dto';
import { CreateModDto } from './dto/create-mod.dto';
import { UpdateModDto } from './dto/update-mod.dto';
import { ModsCommentService } from './mods-comment.service';
import { ModsReviewService } from './mods-review.service';
import { ModsService } from './mods.service';

@Controller('mods')
@ApiTags('Mods')
export class ModsController {
  constructor(
    private readonly modsService: ModsService,
    private readonly modsReviewService: ModsReviewService,
    private readonly modsCommentService: ModsCommentService,
    private readonly minioService: MinioClientService,
  ) {}

  @Post()
  @ApiBearerAuth('jwt')
  @ApiConsumes('multipart/form-data', 'application/json')
  @Secured()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'previews', maxCount: 5 },
      { name: 'file', maxCount: 1 },
    ]),
  )
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createModDto: CreateModDto,
    @UploadedFiles()
    files: {
      previews?: Express.Multer.File[];
      file?: Express.Multer.File[];
    },
  ) {
    return this.modsService.create(files.previews, files.file[0], {
      ...createModDto,
      authorId: req.user.id,
    });
  }

  @Get()
  findAll() {
    return this.modsService.findAll({
      relations: { plateform: true },
    });
  }

  @Get('slug/:slug') findModBySlug(@Param('slug') slug: string) {
    return this.modsService.findOne({
      where: { slug },
      relations: {
        author: true,
        game: true,
        versions: true,
        plateform: true,
      },
    });
  }

  @Get('/me')
  @ApiBearerAuth('jwt')
  @Secured()
  async getMyMods(@Req() req: AuthenticatedRequest) {
    if (!req.user) throw new ForbiddenException();
    return this.modsService.findAll({
      where: { authorId: req.user.id },
      relations: {
        author: true,
        game: true,
        versions: true,
        plateform: true,
      },
    });
  }

  @Get('version/:idVersion/previews')
  async getPreviewByCurrentVersion(@Param('idVersion') idVersion: string) {
    return this.modsService.getPreviewsFromVersion(idVersion);
  }

  @Get(':id/review')
  findReviews(@Param('id') id: string) {
    return this.modsReviewService.findModReviews(id);
  }

  @Post(':id/review')
  @ApiBearerAuth('jwt')
  @Secured()
  addReview(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() createModReviewDto: CreateModReviewDto,
  ) {
    return this.modsReviewService.addReview(
      req.user.id,
      id,
      createModReviewDto.note,
    );
  }

  @Delete(':id/review')
  @ApiBearerAuth('jwt')
  @Secured()
  removeReview(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.modsReviewService.removeReview(req.user.id, id);
  }

  @Get(':id/comment')
  findComments(@Param('id') id: string) {
    return this.modsCommentService.findModComments(id);
  }

  @Post(':id/comment')
  @ApiBearerAuth('jwt')
  @Secured()
  addComment(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() createModCommentDto: CreateModCommentDto,
  ) {
    return this.modsCommentService.addComment(
      req.user.id,
      id,
      createModCommentDto.content,
    );
  }

  @Delete(':id/comment')
  @ApiBearerAuth('jwt')
  @Secured()
  removeComment(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.modsCommentService.removeComment(req.user.id, id);
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

import {
  Body,
  Controller,
  FileTypeValidator,
  ForbiddenException,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from 'interfaces/request.interface';
import { Secured } from 'src/auth/auth.constant';
import { MinioClientService } from 'src/minio/minio.service';
import { getMB } from 'utils/size.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './users.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly minioService: MinioClientService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/me')
  @ApiBearerAuth('jwt')
  @Secured()
  async getMe(@Req() req: AuthenticatedRequest) {
    let user = await this.userService.findOne(req.user.id);
    const link = this.minioService.getPublicUrl(
      process.env.MINIO_USER_BUCKET,
      user.avatar,
    );
    user = { ...user, avatar: link };
    return user;
  }

  @Get('')
  @ApiBearerAuth('jwt')
  @Secured()
  get(@Req() req: AuthenticatedRequest) {
    if (!req.user) throw new ForbiddenException();
    return this.userService.findAll();
  }

  @Patch('')
  @ApiBearerAuth('jwt')
  @Secured()
  update(
    @Req() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!req.user) throw new ForbiddenException();
    return this.userService.update(req.user.id, updateUserDto);
  }

  @Patch('/avatar')
  @ApiBearerAuth('jwt')
  @ApiConsumes('multipart/form-data')
  @Secured()
  @UseInterceptors(FileInterceptor('avatar'))
  updateAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: getMB(10) }), /// 10MB
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    avatar: Express.Multer.File,
    @Req()
    req: AuthenticatedRequest,
  ) {
    if (!req.user) throw new ForbiddenException();
    return this.userService.updateAvatar(avatar, req.user.id);
  }

  @Get('/usernames')
  @ApiBearerAuth('jwt')
  notAvailableUsername() {
    return this.userService.getAllUsername();
  }
}

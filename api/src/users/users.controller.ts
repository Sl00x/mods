import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from 'interfaces/request.interface';
import { Secured } from 'src/auth/auth.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './users.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/me')
  @ApiBearerAuth('jwt')
  @Secured()
  getMe(@Req() req: AuthenticatedRequest) {
    return this.userService.findOne(req.user.id);
  }

  @Get('')
  @ApiBearerAuth('jwt')
  @Secured()
  get(@Req() req: AuthenticatedRequest) {
    if (!req.user) throw new ForbiddenException();
    return this.userService.findAll();
  }
}

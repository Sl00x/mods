import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModComment } from './entities/mod-comment.entity';
import { Mod } from './entities/mod.entity';

@Injectable()
export class ModsCommentService {
  constructor(
    @InjectRepository(ModComment)
    private readonly repository: Repository<ModComment>,
    @InjectRepository(Mod)
    private readonly modRepository: Repository<Mod>,
  ) {}

  async addComment(userId: string, modId: string, content: string) {
    const mod = await this.modRepository.findOne({ where: { id: modId } });
    if (!mod) {
      throw new NotFoundException('mod_not_found');
    }

    return this.repository.save({
      authorId: userId,
      modId,
      content,
    });
  }

  async removeComment(userId: string, id: string) {
    const comment = await this.repository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('comment_not_found');
    }
    if (comment.authorId !== userId) {
      throw new ForbiddenException();
    }
    return this.repository.softDelete({ id });
  }

  async findModComments(modId: string) {
    const mod = await this.modRepository.findOne({
      where: { id: modId },
      relations: {
        comments: true,
      },
    });
    if (!mod) {
      throw new NotFoundException('mod_not_found');
    }
    return mod.comments;
  }
}

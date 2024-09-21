import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModReview } from './entities/mod-review.entity';
import { Mod } from './entities/mod.entity';

@Injectable()
export class ModsReviewService {
  constructor(
    @InjectRepository(ModReview)
    private readonly repository: Repository<ModReview>,
    @InjectRepository(Mod)
    private readonly modRepository: Repository<Mod>,
  ) {}

  async addReview(userId: string, modId: string, note: number) {
    if (note < 0 || note > 5) {
      throw new BadRequestException('invalid_note');
    }

    const mod = await this.modRepository.findOne({ where: { id: modId } });
    if (!mod) {
      throw new NotFoundException('mod_not_found');
    }

    let review = await this.repository.findOne({
      where: {
        modId,
        authorId: userId,
      },
    });
    if (!review) {
      review = this.repository.create({
        authorId: userId,
        modId,
        note,
      });
    }
    review.note = note;
    await this.repository.save(review);

    return review;
  }

  async removeReview(userId: string, modId: string) {
    return this.repository.softDelete({ authorId: userId, modId });
  }

  async findModReviews(modId: string) {
    const mod = await this.modRepository.findOne({
      where: { id: modId },
      relations: {
        reviews: true,
      },
    });
    if (!mod) {
      throw new NotFoundException('mod_not_found');
    }
    return mod.reviews;
  }
}

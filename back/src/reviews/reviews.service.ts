import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    userId: number,
  ): Promise<Review> {
    const { gameId, rating, comment } = createReviewDto;

    const existing = await this.reviewRepository.findOne({
      where: { userId, gameId },
    });
    if (existing) {
      throw new ConflictException(
        'Ya tienes una reseña para este juego. Puedes editarla.',
      );
    }

    const review = this.reviewRepository.create({
      gameId,
      userId,
      rating,
      comment: comment ?? null,
    });
    return await this.reviewRepository.save(review);
  }

  async findByGame(gameId: number) {
    const reviews = await this.reviewRepository.find({
      where: { gameId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
    // No exponer password del usuario
    return reviews.map((r) => ({
      ...r,
      user: r.user ? { id: r.user.id, username: r.user.username } : undefined,
    }));
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'game'],
    });
    if (!review) {
      throw new NotFoundException(`Reseña con ID ${id} no encontrada`);
    }
    return review;
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    const userId = createReviewDto.userId;
    if (userId == null) {
      throw new BadRequestException(
        'Debes iniciar sesión para crear una reseña',
      );
    }
    const { userId: _u, ...dto } = createReviewDto;
    return this.reviewsService.create(dto, userId);
  }

  @Get('game/:gameId')
  findByGame(@Param('gameId') gameId: string) {
    return this.reviewsService.findByGame(+gameId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }
}

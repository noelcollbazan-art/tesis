import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import { ReviewsModule } from './reviews/reviews.module';
import { User } from './auth/entities/user.entity';
import { Game } from './games/entities/game.entity';
import { Review } from './reviews/entities/review.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'gestor_game',
      entities: [User, Game, Review],
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    GamesModule,
    ReviewsModule,
  ],
})
export class AppModule {}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Game } from '../../games/entities/game.entity';
import { User } from '../../auth/entities/user.entity';

@Entity('reviews')
@Unique(['userId', 'gameId']) // Un usuario solo puede tener una reseña por juego
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gameId: number;

  @Column()
  userId: number;

  /** Puntuación de 1 a 5 estrellas */
  @Column({ type: 'tinyint', width: 1 })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Game, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'gameId' })
  game: Game;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}

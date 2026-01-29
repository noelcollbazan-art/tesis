import {
  IsInt,
  IsString,
  IsOptional,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReviewDto {
  @IsInt()
  @Type(() => Number)
  gameId: number;

  /** Enviado por el front al estar logueado; luego puede venir del JWT */
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  userId?: number;

  @IsInt()
  @Min(1, { message: 'La puntuación debe ser al menos 1' })
  @Max(5, { message: 'La puntuación debe ser como máximo 5' })
  @Type(() => Number)
  rating: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'El comentario no puede estar vacío si se envía' })
  comment?: string;
}

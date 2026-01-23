import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @IsString({ each: true })
  technologies: string[];

  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}

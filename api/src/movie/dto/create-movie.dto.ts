import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  readonly duration: number;

  @IsString()
  @IsNotEmpty()
  readonly language: string;

  @IsString()
  @IsOptional()
  readonly subtitles?: string;

  @IsString()
  @IsNotEmpty()
  readonly director: string;

  @IsString()
  @IsNotEmpty()
  readonly mainActors: string;

  @IsNumber()
  @IsNotEmpty()
  readonly minAgeRequired: number;

  @IsDate()
  @IsNotEmpty()
  readonly startDate: Date;

  @IsDate()
  @IsNotEmpty()
  readonly endDate: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly daysPerWeek: number;

  @IsString()
  @IsNotEmpty()
  readonly startingTime: string;
}

import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsNumber()
  @IsOptional()
  readonly duration?: number;

  @IsString()
  @IsOptional()
  readonly language?: string;

  @IsString()
  @IsOptional()
  readonly subtitles?: string;

  @IsString()
  @IsOptional()
  readonly director?: string;

  @IsString()
  @IsOptional()
  readonly mainActors?: string;

  @IsNumber()
  @IsOptional()
  readonly minAgeRequired?: number;

  @IsDate()
  @IsOptional()
  readonly startDate: Date;

  @IsDate()
  @IsOptional()
  readonly endDate: Date;

  @IsNumber()
  @IsOptional()
  readonly daysPerWeek?: number;

  @IsString()
  @IsOptional()
  readonly startingTime?: string;
}

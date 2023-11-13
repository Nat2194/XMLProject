import { IsDate, IsString, IsInt, IsOptional } from 'class-validator';

// Custom Imports
import { IsDateWithTime } from '../decorator/validator';

export class UpdateMovieSessionDto {
  @IsDate()
  @IsOptional()
  @IsDateWithTime()
  date?: Date;

  @IsString()
  @IsOptional()
  theatreName?: string;

  @IsString()
  @IsOptional()
  theatreAddress?: string;

  @IsString()
  @IsOptional()
  theatreCity?: string;

  @IsInt()
  @IsOptional()
  movieId?: number;
}

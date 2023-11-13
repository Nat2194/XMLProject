import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

// Custom Imports
import { IsDateWithTime } from '../decorator/validator';

export class CreateMovieSessionDto {
  @IsDate()
  @IsNotEmpty()
  @IsDateWithTime()
  startDate!: Date;

  @IsDate()
  @IsNotEmpty()
  @IsDateWithTime()
  endDate!: Date;

  @IsString()
  @IsNotEmpty()
  theatreName!: string;

  @IsString()
  @IsNotEmpty()
  theatreAddress!: string;

  @IsString()
  @IsNotEmpty()
  theatreCity!: string;

  @IsInt()
  @IsNotEmpty()
  movieId!: number;
}

import { IsDate, IsNotEmpty, IsString } from 'class-validator';

// Custom Imports
import { IsDateWithTime } from '../decorator/validator';

export class CreateMovieSessionDto {
  @IsDate()
  @IsNotEmpty()
  @IsDateWithTime()
  date!: Date;

  @IsString()
  @IsNotEmpty()
  theatreName!: string;

  @IsString()
  @IsNotEmpty()
  theatreAddress!: string;

  @IsString()
  @IsNotEmpty()
  theatreCity!: string;
}

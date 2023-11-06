import { IsDate, IsString, IsNotEmpty, IsOptional } from 'class-validator';

// Custom Imports
import { IsDateWithTime } from '../decorator/validator';

export class UpdateMovieSessionDto {
  @IsDate()
  @IsNotEmpty()
  @IsDateWithTime()
  @IsOptional()
  date?: Date;

  @IsString()
  @IsNotEmpty()
  theatreName!: string;

  @IsString()
  @IsNotEmpty()
  theatreAddress!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  theatreCity!: string;
}

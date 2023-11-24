import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service'; // Import the MovieService
import { CreateMovieDto, UpdateMovieDto } from './dto'; // Define DTOs for creating and updating movies
import { Movie } from './movie.entity'; // Import the Movie entity
import { Auth } from 'src/auth/auth.decorator';

@Controller('movie') // Use the appropriate route path
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Auth()
  @Post()
  create(@Body() dto: CreateMovieDto): Promise<Movie> {
    return this.movieService.createMovie(dto);
  }

  @Get()
  findAll(): Promise<Movie[]> {
    return this.movieService.findAllMovies();
  }

  @Get(':id')
  findMovieById(@Param('id', ParseIntPipe) movieId: number): Promise<Movie> {
    return this.movieService.findMovieById(movieId);
  }

  @Get('name/:name')
  findMovieByName(@Param('name', ParseIntPipe) name: string): Promise<Movie> {
    return this.movieService.findMovieByName(name);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) movieId: number,
    @Body() dto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.movieService.updateMovie(movieId, dto);
  }

  @Auth() // Add authentication decorator if needed
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) movieId: number): Promise<void> {
    return this.movieService.deleteMovie(movieId);
  }
}

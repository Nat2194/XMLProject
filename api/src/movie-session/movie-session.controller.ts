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
import { MovieSessionService } from './movie-session.service';
import { CreateMovieSessionDto, UpdateMovieSessionDto } from './dto'; // Define DTOs for creating and updating movies
import { MovieSession } from './movie-session.entity'; // Import the Movie entity
import { Auth } from 'src/auth/auth.decorator';

@Controller('session')
export class MovieSessionController {
  constructor(private movieSessionService: MovieSessionService) {}

  @Auth()
  @Post()
  create(@Body() session: CreateMovieSessionDto): Promise<MovieSession> {
    return this.movieSessionService.addSessionToMovie(session);
  }

  @Get()
  findAll(): Promise<MovieSession[]> {
    return this.movieSessionService.findAllMovieSessions();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) sessionId: number): Promise<MovieSession> {
    return this.movieSessionService.findMovieSessionById(sessionId);
  }

  @Get('movie/:movieId')
  findMovieSessionsByMovie(
    @Param('movieId', ParseIntPipe) movieId: number,
  ): Promise<MovieSession[]> {
    return this.movieSessionService.findMovieSessionsByMovie(movieId);
  }

  @Get('city/:cityName')
  findMovieSessionsByCity(
    @Param('cityName', ParseIntPipe) cityName: string,
  ): Promise<MovieSession[]> {
    return this.movieSessionService.findMovieSessionsByCity(cityName);
  }

  @Get('date/:date')
  findMovieSessionsByDate(
    @Param('date', ParseIntPipe) date: Date,
  ): Promise<MovieSession[]> {
    return this.movieSessionService.findMovieSessionsByDate(date);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) sessionId: number,
    @Body() dto: UpdateMovieSessionDto,
  ): Promise<MovieSession> {
    return this.movieSessionService.updateMovieSession(sessionId, dto);
  }

  @Auth()
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) sessionId: number): Promise<void> {
    return this.movieSessionService.deleteMovieSession(sessionId);
  }
}

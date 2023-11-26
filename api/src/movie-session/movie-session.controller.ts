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

// Custom Imports
import { MovieSessionService } from './movie-session.service';
import { CreateMovieSessionDto, UpdateMovieSessionDto } from './dto'; // Define DTOs for creating and updating movies
import { MovieSession } from './movie-session.entity'; // Import the Movie entity
import { Auth } from '../auth/auth.decorator';
import { ParseDatePipe } from '../shared/validators/parse-date-pipe';

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
  findMovieSessionsByMovieId(
    @Param('movieId', ParseIntPipe) movieId: number,
  ): Promise<MovieSession[]> {
    return this.movieSessionService.findMovieSessionsByMovieId(movieId);
  }

  @Get('movie-name/:name')
  findMovieSessionsByMovieName(
    @Param('name') name: string,
  ): Promise<MovieSession[]> {
    return this.movieSessionService.findMovieSessionsByMovieName(name);
  }

  @Get('city/:cityName')
  findMovieSessionsByCity(
    @Param('cityName') cityName: string,
  ): Promise<MovieSession[]> {
    return this.movieSessionService.findMovieSessionsByPartialCity(cityName);
  }

  @Get('date/:date')
  findMovieSessionsByDate(
    @Param('date', ParseDatePipe) date: Date,
  ): Promise<MovieSession[]> {
    return this.movieSessionService.findMovieSessionsByDate(date);
  }

  @Get('date/:startDate/:endDate')
  findMovieSessionsByDateRange(
    @Param('startDate', ParseDatePipe) startDate: Date,
    @Param('endDate', ParseDatePipe) endDate: Date,
  ): Promise<MovieSession[]> {
    return this.movieSessionService.findMovieSessionsByDateRange(
      startDate,
      endDate,
    );
  }

  @Post('search')
  searchMovieSessions(@Body() searchCriteria: any): Promise<MovieSession[]> {
    return this.movieSessionService.searchMovieSessionsByCriteria(
      searchCriteria,
    );
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

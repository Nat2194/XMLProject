import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { wrap } from '@mikro-orm/core';

// Custom imports
import { MovieSession } from './movie-session.entity';
import { CreateMovieSessionDto, UpdateMovieSessionDto } from './dto';
import { MovieService } from '../movie/movie.service';

@Injectable()
export class MovieSessionService {
  constructor(
    @InjectRepository(MovieSession)
    private readonly movieSessionRepository: EntityRepository<MovieSession>,
    private readonly movieService: MovieService,
  ) {}

  public async addSessionToMovie(
    dto: CreateMovieSessionDto,
  ): Promise<MovieSession> {
    if (
      await this.movieSessionRepository.findOne({
        movie: await this.movieService.findMovieById(dto.movieId),
        startDate: dto.startDate,
        endDate: dto.endDate,
      })
    ) {
      throw new ConflictException(
        'Movie Session with the same date already exists',
      );
    }
    const movieSession = new MovieSession(dto);
    await this.movieSessionRepository.flush();
    return await this.movieService.addSessionToMovie(movieSession);
  }

  public async findAllMovieSessions(): Promise<MovieSession[]> {
    return this.movieSessionRepository.findAll();
  }

  public async findMovieSessionById(sessionId: number): Promise<MovieSession> {
    try {
      return await this.movieSessionRepository.findOneOrFail({
        sessionId,
      });
    } catch (error) {
      throw new NotFoundException('Movie Session not found');
    }
  }

  public async findMovieSessionsByMovie(
    movieId: number,
  ): Promise<MovieSession[]> {
    try {
      return await this.movieSessionRepository.find({
        movie: await this.movieService.findMovieById(movieId),
      });
    } catch (error) {
      throw new NotFoundException('Movie Session not found for this Movie');
    }
  }

  public async findMovieSessionsByCity(city: string): Promise<MovieSession[]> {
    try {
      return await this.movieSessionRepository.find({
        theatreCity: city,
      });
    } catch (error) {
      throw new NotFoundException('Movie Session not found for this City');
    }
  }

  public async findMovieSessionsByDate(date: Date): Promise<MovieSession[]> {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      return await this.movieSessionRepository.find({
        startDate: { $gte: startOfDay, $lte: endOfDay },
      });
    } catch (error) {
      throw new NotFoundException('Movie Session not found for this Date');
    }
  }

  public async findMovieSessionsByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<MovieSession[]> {
    try {
      return await this.movieSessionRepository.find({
        startDate: startDate,
        endDate: endDate,
      });
    } catch (error) {
      throw new NotFoundException('Movie Session not found for this Date');
    }
  }

  public async updateMovieSession(
    sessionId: number,
    dto: UpdateMovieSessionDto,
  ): Promise<MovieSession> {
    const session = await this.findMovieSessionById(sessionId);
    wrap(session).assign(dto);
    await this.movieSessionRepository.flush();
    return session;
  }

  public async deleteMovieSession(sessionId: number): Promise<void> {
    const session = await this.findMovieSessionById(sessionId);
    await this.movieSessionRepository.removeAndFlush(session);
  }
}

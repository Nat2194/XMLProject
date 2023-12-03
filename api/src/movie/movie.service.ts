import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { wrap } from '@mikro-orm/core';

// Custom imports
import { Movie } from './movie.entity';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { MovieSession } from 'src/movie-session/movie-session.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: EntityRepository<Movie>,
  ) {}

  public async createMovie(dto: CreateMovieDto): Promise<Movie> {
    if (await this.movieRepository.findOne({ title: dto.title })) {
      throw new ConflictException('Movie with the same title already exists');
    }

    const movie = new Movie(dto);
    await this.movieRepository.persistAndFlush(movie);
    return movie;
  }

  public async findAllMovies(): Promise<Movie[]> {
    return await this.movieRepository.findAll();
  }

  public async findMovieById(movieId: number): Promise<Movie> {
    try {
      return await this.movieRepository.findOneOrFail({ movieId });
    } catch (error) {
      throw new NotFoundException('Movie not found');
    }
  }

  public async findMovieByName(name: string): Promise<Movie> {
    try {
      return await this.movieRepository.findOneOrFail({ title: name });
    } catch (error) {
      throw new NotFoundException('Movie not found');
    }
  }

  public async findMovieByPartialName(name: string): Promise<Movie> {
    try {
      const matchesList = await this.movieRepository.find({
        title: { $ilike: `${name}%` }, // Utilisation de ILIKE pour la recherche insensible à la casse
      });
      return matchesList[0];
    } catch (error) {
      throw new NotFoundException('Movie not found');
    }
  }

  public async updateMovie(
    movieId: number,
    dto: UpdateMovieDto,
  ): Promise<Movie> {
    const movie = await this.findMovieById(movieId);
    wrap(movie).assign(dto);
    await this.movieRepository.flush();
    return movie;
  }

  public async deleteMovie(movieId: number): Promise<void> {
    const movie = await this.findMovieById(movieId);
    await this.movieRepository.removeAndFlush(movie);
  }

  public async addSessionToMovie(session: MovieSession): Promise<MovieSession> {
    const movie = session.movie;
    movie.sessions.add(session);
    await this.movieRepository.flush();
    return session;
  }
}

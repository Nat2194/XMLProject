import { EntityRepository } from '@mikro-orm/postgresql';
import { MovieSession } from './movie-session.entity';
import { CreateMovieSessionDto, UpdateMovieSessionDto } from './dto';
import { MovieService } from '../movie/movie.service';
export declare class MovieSessionService {
    private readonly movieSessionRepository;
    private readonly movieService;
    constructor(movieSessionRepository: EntityRepository<MovieSession>, movieService: MovieService);
    addSessionToMovie(dto: CreateMovieSessionDto): Promise<MovieSession>;
    findAllMovieSessions(): Promise<MovieSession[]>;
    findMovieSessionById(sessionId: number): Promise<MovieSession>;
    findMovieSessionsByMovie(movieId: number): Promise<MovieSession[]>;
    findMovieSessionsByCity(city: string): Promise<MovieSession[]>;
    findMovieSessionsByDate(date: Date): Promise<MovieSession[]>;
    updateMovieSession(sessionId: number, dto: UpdateMovieSessionDto): Promise<MovieSession>;
    deleteMovieSession(sessionId: number): Promise<void>;
}

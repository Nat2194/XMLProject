import { EntityRepository } from '@mikro-orm/postgresql';
import { Movie } from './movie.entity';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { MovieSession } from 'src/movie-session/movie-session.entity';
export declare class MovieService {
    private readonly movieRepository;
    constructor(movieRepository: EntityRepository<Movie>);
    createMovie(dto: CreateMovieDto): Promise<Movie>;
    findAllMovies(): Promise<Movie[]>;
    findMovieById(movieId: number): Promise<Movie>;
    findMovieByName(name: string): Promise<Movie>;
    findMovieByPartialName(name: string): Promise<Movie>;
    updateMovie(movieId: number, dto: UpdateMovieDto): Promise<Movie>;
    deleteMovie(movieId: number): Promise<void>;
    addSessionToMovie(session: MovieSession): Promise<MovieSession>;
}

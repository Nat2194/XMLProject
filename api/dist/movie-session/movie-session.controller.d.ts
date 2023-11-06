import { MovieSessionService } from './movie-session.service';
import { CreateMovieSessionDto, UpdateMovieSessionDto } from './dto';
import { MovieSession } from './movie-session.entity';
export declare class MovieSessionController {
    private movieSessionService;
    constructor(movieSessionService: MovieSessionService);
    create(session: CreateMovieSessionDto): Promise<MovieSession>;
    findAll(): Promise<MovieSession[]>;
    findOne(sessionId: number): Promise<MovieSession>;
    findMovieSessionsByMovie(movieId: number): Promise<MovieSession[]>;
    findMovieSessionsByCity(cityName: string): Promise<MovieSession[]>;
    findMovieSessionsByDate(date: Date): Promise<MovieSession[]>;
    update(sessionId: number, dto: UpdateMovieSessionDto): Promise<MovieSession>;
    delete(sessionId: number): Promise<void>;
}

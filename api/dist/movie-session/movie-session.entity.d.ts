import { Movie } from '../movie/movie.entity';
import { CreateMovieSessionDto } from './dto/create-movie-session.dto';
export declare class MovieSession {
    constructor(dto: CreateMovieSessionDto);
    sessionId: number;
    startDate: Date;
    endDate: Date;
    theatreName: string;
    theatreAddress: string;
    theatreCity: string;
    movie: Movie;
}

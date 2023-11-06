import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { Movie } from './movie.entity';
export declare class MovieController {
    private movieService;
    constructor(movieService: MovieService);
    create(dto: CreateMovieDto): Promise<Movie>;
    findAll(): Promise<Movie[]>;
    findOne(movieId: number): Promise<Movie>;
    update(movieId: number, dto: UpdateMovieDto): Promise<Movie>;
    delete(movieId: number): Promise<void>;
}

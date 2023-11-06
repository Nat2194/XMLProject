import { Collection } from '@mikro-orm/core';
import { MovieSession } from '../movie-session/movie-session.entity';
import { CreateMovieDto } from './dto';
export declare class Movie {
    constructor(dto: CreateMovieDto);
    movieId: number;
    title: string;
    duration: number;
    language: string;
    subtitles?: string;
    director: string;
    mainActors: string;
    minAgeRequired: number;
    startDate: Date;
    endDate: Date;
    sessions: Collection<MovieSession, object>;
}

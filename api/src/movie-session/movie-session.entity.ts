import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Movie } from '../movie/movie.entity';
import { CreateMovieSessionDto } from './dto/create-movie-session.dto';

@Entity()
export class MovieSession {
  constructor(dto: CreateMovieSessionDto) {
    this.startDate = dto.startDate;
    this.endDate = dto.endDate;
    this.theatreName = dto.theatreName;
    this.theatreAddress = dto.theatreAddress;
    this.theatreCity = dto.theatreCity;
  }

  @PrimaryKey()
  sessionId!: number;

  @Property()
  startDate!: Date;

  @Property()
  endDate!: Date;

  @Property()
  theatreName!: string;

  @Property()
  theatreAddress!: string;

  @Property()
  theatreCity!: string;

  @ManyToOne(() => Movie)
  movie!: Movie;
}

import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';

// Custom imports
import { MovieSession } from '../movie-session/movie-session.entity';
import { CreateMovieDto } from './dto';

@Entity()
export class Movie {
  constructor(dto: CreateMovieDto) {
    this.title = dto.title;
    this.duration = dto.duration;
    this.language = dto.language;
    this.subtitles = dto.subtitles;
    this.director = dto.director;
    this.mainActors = dto.mainActors;
    this.minAgeRequired = dto.minAgeRequired;
    this.startDate = dto.startDate;
    this.endDate = dto.endDate;
  }

  @PrimaryKey()
  movieId!: number;

  @Property()
  title!: string;

  @Property()
  duration!: number; // Duration in minutes

  @Property()
  language!: string;

  @Property()
  subtitles?: string; // Subtitles if needed

  @Property()
  director!: string;

  @Property()
  mainActors!: string;

  @Property()
  minAgeRequired!: number;

  @Property()
  startDate!: Date;

  @Property()
  endDate!: Date;

  @OneToMany(() => MovieSession, (session) => session.movie)
  sessions = new Collection<MovieSession>(this);
}

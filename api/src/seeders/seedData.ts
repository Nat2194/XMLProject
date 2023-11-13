import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { Movie } from '../movie/movie.entity'; // Assurez-vous d'importer correctement vos entités
import { MovieSession } from '../movie-session/movie-session.entity'; // Assurez-vous d'importer correctement vos entités

export default async (em: EntityManager): Promise<void> => {
  // Seed data for the 'movie' table
  const moviesData = [
    {
      title: 'Inception',
      duration: 148,
      language: 'English',
      subtitles: 'French',
      director: 'Christopher Nolan',
      mainActors: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
      minAgeRequired: 14,
      startDate: new Date('2023-01-01T12:00:00Z'),
      endDate: new Date('2023-01-10T12:00:00Z'),
    },
    {
      title: 'The Shawshank Redemption',
      duration: 142,
      language: 'English',
      subtitles: 'Spanish',
      director: 'Frank Darabont',
      mainActors: 'Tim Robbins, Morgan Freeman',
      minAgeRequired: 16,
      startDate: new Date('2023-02-01T12:00:00Z'),
      endDate: new Date('2023-02-10T12:00:00Z'),
    },
    {
      title: 'The Dark Knight',
      duration: 152,
      language: 'English',
      subtitles: 'French',
      director: 'Christopher Nolan',
      mainActors: 'Christian Bale, Heath Ledger',
      minAgeRequired: 14,
      startDate: new Date('2023-03-01T12:00:00Z'),
      endDate: new Date('2023-03-10T12:00:00Z'),
    },
    {
      title: 'Pulp Fiction',
      duration: 154,
      language: 'English',
      subtitles: 'Spanish',
      director: 'Quentin Tarantino',
      mainActors: 'John Travolta, Uma Thurman',
      minAgeRequired: 18,
      startDate: new Date('2023-04-01T12:00:00Z'),
      endDate: new Date('2023-04-10T12:00:00Z'),
    },
    {
      title: 'The Godfather',
      duration: 175,
      language: 'English',
      subtitles: 'Italian',
      director: 'Francis Ford Coppola',
      mainActors: 'Marlon Brando, Al Pacino',
      minAgeRequired: 18,
      startDate: new Date('2023-05-01T12:00:00Z'),
      endDate: new Date('2023-05-10T12:00:00Z'),
    },
  ];

  // Seed data for the 'movie_session' table
  const movieSessionsData = [
    {
      startDate: new Date('2023-01-05T18:00:00Z'),
      endDate: new Date('2023-01-05T21:00:00Z'),
      theatreName: 'Cinema Paradise',
      theatreAddress: '123 Main Street',
      theatreCity: 'New York 1',
      movie: 1,
    },
    {
      startDate: new Date('2023-01-07T20:00:00Z'),
      endDate: new Date('2023-01-07T23:00:00Z'),
      theatreName: 'City Star Cinema',
      theatreAddress: '456 Elm Avenue',
      theatreCity: 'Los Angeles',
      movie: 2,
    },
    {
      startDate: new Date('2023-02-10T15:30:00Z'),
      endDate: new Date('2023-02-10T18:30:00Z'),
      theatreName: 'Metroplex Cinemas',
      theatreAddress: '789 Oak Boulevard',
      theatreCity: 'Boston',
      movie: 3,
    },
    // Add more movie session data as needed
    {
      startDate: new Date('2023-02-15T18:30:00Z'),
      endDate: new Date('2023-02-15T21:30:00Z'),
      theatreName: 'Cinema Paradise',
      theatreAddress: '123 Main Street',
      theatreCity: 'New York',
      movie: 2,
    },
    {
      startDate: new Date('2023-03-02T19:45:00Z'),
      endDate: new Date('2023-03-02T22:45:00Z'),
      theatreName: 'City Star Cinema',
      theatreAddress: '456 Elm Avenue',
      theatreCity: 'Los Angeles',
      movie: 3,
    },
  ];

  // Persist movie data
  for (const movieData of moviesData) {
    const movie = em.create(Movie, movieData);
    await em.persistAndFlush(movie);
  }

  // Persist movie session data
  for (const sessionData of movieSessionsData) {
    const { movie: movieId, ...sessionDetails } = sessionData;
    const movie = await em.findOne(Movie, { movieId } as FilterQuery<Movie>);

    if (!movie) {
      console.error(`Movie with ID ${movieId} not found.`);
      continue;
    }

    const session = em.create(MovieSession, {
      ...sessionDetails,
      movie: movie,
    });

    await em.persistAndFlush(session);
  }
};

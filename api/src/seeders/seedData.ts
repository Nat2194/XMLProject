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
      startDate: new Date('2023-12-07T12:00:00Z'),
      endDate: new Date('2023-12-20T12:00:00Z'),
    },
    {
      title: 'The Shawshank Redemption',
      duration: 142,
      language: 'English',
      subtitles: 'Spanish',
      director: 'Frank Darabont',
      mainActors: 'Tim Robbins, Morgan Freeman',
      minAgeRequired: 16,
      startDate: new Date('2023-11-29T12:00:00Z'),
      endDate: new Date('2023-12-13T12:00:00Z'),
    },
    {
      title: 'The Dark Knight',
      duration: 152,
      language: 'English',
      subtitles: 'French',
      director: 'Christopher Nolan',
      mainActors: 'Christian Bale, Heath Ledger',
      minAgeRequired: 14,
      startDate: new Date('2023-12-07T12:00:00Z'),
      endDate: new Date('2023-12-20T12:00:00Z'),
    },
    {
      title: 'Pulp Fiction',
      duration: 154,
      language: 'English',
      subtitles: 'Spanish',
      director: 'Quentin Tarantino',
      mainActors: 'John Travolta, Uma Thurman',
      minAgeRequired: 18,
      startDate: new Date('2023-11-29T12:00:00Z'),
      endDate: new Date('2023-12-20T12:00:00Z'),
    },
    {
      title: 'The Godfather',
      duration: 175,
      language: 'English',
      subtitles: 'Italian',
      director: 'Francis Ford Coppola',
      mainActors: 'Marlon Brando, Al Pacino',
      minAgeRequired: 18,
      startDate: new Date('2023-11-29T12:00:00Z'),
      endDate: new Date('2023-12-27T12:00:00Z'),
    },
    {
      title: 'Lumière des Rêves',
      duration: 130,
      language: 'French',
      subtitles: 'English',
      director: 'Émilie Laurent',
      mainActors: 'Juliette Binoche, Vincent Cassel',
      minAgeRequired: 12,
      startDate: new Date('2023-12-10T12:00:00Z'),
      endDate: new Date('2023-12-24T12:00:00Z'),
    },
    {
      title: 'Echoes in Silence',
      duration: 118,
      language: 'English',
      subtitles: 'French',
      director: 'Oliver Harris',
      mainActors: 'Emily Blunt, Tom Hiddleston',
      minAgeRequired: 16,
      startDate: new Date('2023-12-05T12:00:00Z'),
      endDate: new Date('2023-12-19T12:00:00Z'),
    },
    {
      title: 'Le Voyageur Temporel',
      duration: 143,
      language: 'French',
      subtitles: 'English',
      director: 'Jean-Luc Godard',
      mainActors: 'Romain Duris, Marion Cotillard',
      minAgeRequired: 14,
      startDate: new Date('2023-12-08T12:00:00Z'),
      endDate: new Date('2023-12-22T12:00:00Z'),
    },
    {
      title: 'Stars Beyond Reach',
      duration: 134,
      language: 'English',
      subtitles: 'Spanish',
      director: 'Sophia Torres',
      mainActors: 'Chris Hemsworth, Zoe Saldana',
      minAgeRequired: 12,
      startDate: new Date('2023-12-11T12:00:00Z'),
      endDate: new Date('2023-12-25T12:00:00Z'),
    },
    {
      title: 'Les Ombres de Paris',
      duration: 127,
      language: 'French',
      subtitles: 'German',
      director: 'Claire Dubois',
      mainActors: 'Léa Seydoux, Gaspard Ulliel',
      minAgeRequired: 16,
      startDate: new Date('2023-12-06T12:00:00Z'),
      endDate: new Date('2023-12-20T12:00:00Z'),
    },
  ];

  // Seed data for the 'movie_session' table
  const movieSessionsData = [
    {
      startDate: new Date('2023-12-13T19:00:00Z'),
      endDate: new Date('2023-12-13T21:30:00Z'),
      theatreName: 'Cinéma Lumière',
      theatreAddress: '12 Rue de la Liberté',
      theatreCity: 'Paris',
      movie: 1,
    },
    {
      startDate: new Date('2023-12-14T16:00:00Z'),
      endDate: new Date('2023-12-14T18:30:00Z'),
      theatreName: 'Le Grand Rex',
      theatreAddress: '1 Boulevard Poissonnière',
      theatreCity: 'Paris',
      movie: 2,
    },
    {
      startDate: new Date('2023-12-15T20:30:00Z'),
      endDate: new Date('2023-12-15T23:00:00Z'),
      theatreName: 'Cinéma Gaumont',
      theatreAddress: '27 Rue du Jeu des Enfants',
      theatreCity: 'Strasbourg',
      movie: 3,
    },
    {
      startDate: new Date('2023-12-14T14:00:00Z'),
      endDate: new Date('2023-12-14T16:30:00Z'),
      theatreName: 'Pathé Bellecour',
      theatreAddress: '79 Rue de la République',
      theatreCity: 'Lyon',
      movie: 4,
    },
    {
      startDate: new Date('2023-12-13T21:45:00Z'),
      endDate: new Date('2023-12-14T00:15:00Z'),
      theatreName: 'UGC Ciné Cité',
      theatreAddress: '6 Rue du Docteur Charles Nancel Penard',
      theatreCity: 'Bordeaux',
      movie: 5,
    },
    {
      startDate: new Date('2023-12-16T18:00:00Z'),
      endDate: new Date('2023-12-16T20:30:00Z'),
      theatreName: 'Cinéma Lumière',
      theatreAddress: '12 Rue de la Liberté',
      theatreCity: 'Paris',
      movie: 5,
    },
    {
      startDate: new Date('2023-12-17T15:00:00Z'),
      endDate: new Date('2023-12-17T17:30:00Z'),
      theatreName: 'Le Grand Rex',
      theatreAddress: '1 Boulevard Poissonnière',
      theatreCity: 'Paris',
      movie: 4,
    },
    {
      startDate: new Date('2023-12-18T20:00:00Z'),
      endDate: new Date('2023-12-18T22:30:00Z'),
      theatreName: 'Cinéma Gaumont',
      theatreAddress: '27 Rue du Jeu des Enfants',
      theatreCity: 'Strasbourg',
      movie: 1,
    },
    {
      startDate: new Date('2023-12-19T17:00:00Z'),
      endDate: new Date('2023-12-19T19:30:00Z'),
      theatreName: 'Pathé Bellecour',
      theatreAddress: '79 Rue de la République',
      theatreCity: 'Lyon',
      movie: 3,
    },
    {
      startDate: new Date('2023-12-20T21:30:00Z'),
      endDate: new Date('2023-12-20T00:00:00Z'),
      theatreName: 'UGC Ciné Cité',
      theatreAddress: '6 Rue du Docteur Charles Nancel Penard',
      theatreCity: 'Bordeaux',
      movie: 2,
    },
    {
      startDate: new Date('2023-12-21T17:00:00Z'),
      endDate: new Date('2023-12-21T19:30:00Z'),
      theatreName: 'Cinéma Lumière',
      theatreAddress: '12 Rue de la Liberté',
      theatreCity: 'Paris',
      movie: 6,
    },
    {
      startDate: new Date('2023-12-22T20:00:00Z'),
      endDate: new Date('2023-12-22T22:30:00Z'),
      theatreName: 'Le Grand Rex',
      theatreAddress: '1 Boulevard Poissonnière',
      theatreCity: 'Paris',
      movie: 7,
    },
    {
      startDate: new Date('2023-12-23T18:30:00Z'),
      endDate: new Date('2023-12-23T21:00:00Z'),
      theatreName: 'Cinéma Gaumont',
      theatreAddress: '27 Rue du Jeu des Enfants',
      theatreCity: 'Strasbourg',
      movie: 8,
    },
    {
      startDate: new Date('2023-12-24T15:00:00Z'),
      endDate: new Date('2023-12-24T17:30:00Z'),
      theatreName: 'Pathé Bellecour',
      theatreAddress: '79 Rue de la République',
      theatreCity: 'Lyon',
      movie: 9,
    },
    {
      startDate: new Date('2023-12-25T21:00:00Z'),
      endDate: new Date('2023-12-25T23:30:00Z'),
      theatreName: 'UGC Ciné Cité',
      theatreAddress: '6 Rue du Docteur Charles Nancel Penard',
      theatreCity: 'Bordeaux',
      movie: 10,
    },
    {
      startDate: new Date('2023-12-26T18:00:00Z'),
      endDate: new Date('2023-12-26T20:30:00Z'),
      theatreName: 'Cinéma Lumière',
      theatreAddress: '12 Rue de la Liberté',
      theatreCity: 'Paris',
      movie: 6,
    },
    {
      startDate: new Date('2023-12-27T20:00:00Z'),
      endDate: new Date('2023-12-27T22:30:00Z'),
      theatreName: 'Le Grand Rex',
      theatreAddress: '1 Boulevard Poissonnière',
      theatreCity: 'Paris',
      movie: 7,
    },
    {
      startDate: new Date('2023-12-28T18:30:00Z'),
      endDate: new Date('2023-12-28T21:00:00Z'),
      theatreName: 'Cinéma Gaumont',
      theatreAddress: '27 Rue du Jeu des Enfants',
      theatreCity: 'Strasbourg',
      movie: 8,
    },
    {
      startDate: new Date('2023-12-29T15:00:00Z'),
      endDate: new Date('2023-12-29T17:30:00Z'),
      theatreName: 'Pathé Bellecour',
      theatreAddress: '79 Rue de la République',
      theatreCity: 'Lyon',
      movie: 9,
    },
    {
      startDate: new Date('2023-12-30T21:00:00Z'),
      endDate: new Date('2023-12-30T23:30:00Z'),
      theatreName: 'UGC Ciné Cité',
      theatreAddress: '6 Rue du Docteur Charles Nancel Penard',
      theatreCity: 'Bordeaux',
      movie: 10,
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

import { NestFactory } from '@nestjs/core';
import { MikroORM } from '@mikro-orm/core';
import * as cookieParser from 'cookie-parser';

// Custom imports
import { AppModule } from './app.module';
import { config } from './shared/configs/config';
import { User } from './user/user.entity';
import { Movie } from './movie/movie.entity';
import { MovieSession } from './movie-session/movie-session.entity';

async function bootstrap() {
  const orm = await MikroORM.init({
    entities: [User, Movie, MovieSession], // Add your entities here
    dbName: process.env.DB_NAME,
    type: 'postgresql', // Or your database type
    // Other database connection options here
  });

  await orm.getMigrator().up(); // Run database migrations
  const app = await NestFactory.create(AppModule);

  //Security
  app.use(cookieParser(config.get<string>('cookie.secret')));

  app.enableCors({
    origin: config.get('websiteUrl'),
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();

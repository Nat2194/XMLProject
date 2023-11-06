import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

// Custom imports
import { MovieSessionService } from './movie-session.service';
import { MovieSessionController } from './movie-session.controller';
import { MovieSession } from './movie-session.entity';
import { MovieModule } from '../movie/movie.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [MovieSession] }),
    MovieModule,
  ],
  controllers: [MovieSessionController],
  providers: [MovieSessionService],
})
export class MovieSessionModule {}

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

// Custom imports
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie } from './movie.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Movie] })],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}

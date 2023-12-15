import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

// Custom imports
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieSessionModule } from './movie-session/movie-session.module';
import { CacheControlMiddleware } from './middlewares/cacheControl.middleware';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    UserModule,
    AuthModule,
    MovieModule,
    MovieSessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CacheControlMiddleware).forRoutes('*');
  }
}

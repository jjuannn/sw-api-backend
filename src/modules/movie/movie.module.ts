import { Module } from '@nestjs/common';
import { MovieService } from './service/movie.service';
import { MovieController } from './controller/movie.controller';
import { MovieRepository } from './repository/movie.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './repository/entity/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MovieController],
  providers: [
    MovieService,
    {
      provide: 'MOVIE_REPOSITORY',
      useClass: MovieRepository,
    },
  ],
})
export class MovieModule {}

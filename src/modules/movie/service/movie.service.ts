import { Injectable, Inject } from '@nestjs/common';
import { CreateMovieDto } from '../controller/dto/create-movie.dto';
import { UpdateMovieDto } from '../controller/dto/update-movie.dto';
import { MovieRepository } from '../repository/movie.repository';
import { MovieEntity } from '../repository/entity/movie.entity';
import { IMovieService } from './interface/movie.service.interface';
import { IMovieRepository } from '../repository/interface/movie.repository.interface';
import { MovieNotFoundError } from './error/error.movie.service';

@Injectable()
export class MovieService implements IMovieService {
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private readonly movieRepository: IMovieRepository,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<MovieEntity> {
    const { title, director, openingCrawl, releaseDate } = createMovieDto;

    return this.movieRepository.create({
      title,
      director,
      openingCrawl,
      releaseDate: new Date(releaseDate),
    });
  }

  async findAll(): Promise<MovieEntity[]> {
    return this.movieRepository.findAll();
  }

  async findById(id: number): Promise<MovieEntity> {
    const movie = await this.movieRepository.findById(id);

    if (!movie) {
      throw new MovieNotFoundError();
    }

    return movie;
  }

  async updateById(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<MovieEntity> {
    const { title, director, openingCrawl, releaseDate } = updateMovieDto;

    return this.movieRepository.updateById(id, {
      title,
      director,
      openingCrawl,
      ...(releaseDate ? { releaseDate: new Date(releaseDate) } : {}),
    });
  }

  async deleteById(id: number): Promise<void> {
    return this.movieRepository.deleteById(id);
  }
}

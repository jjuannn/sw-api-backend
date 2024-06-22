import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from './entity/movie.entity';
import { ICreateMovieInput } from './interface/input/create-movie.input.interface';
import { IUpdateMovieInput } from './interface/input/update-movie.input.interface';
import { IMovieRepository } from './interface/movie.repository.interface';

@Injectable()
export class MovieRepository implements IMovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return this.movieRepository.find({
      select: ['id', 'title', 'director', 'openingCrawl', 'releaseDate'],
      order: { id: { direction: 'ASC' } },
    });
  }

  async findById(id: number): Promise<MovieEntity> {
    return this.movieRepository.findOne({
      where: { id },
      select: ['title', 'director', 'openingCrawl', 'releaseDate'],
    });
  }

  async create(movieData: ICreateMovieInput): Promise<MovieEntity> {
    const { title, director, releaseDate, openingCrawl } = movieData;

    const movieToSave = new MovieEntity();
    movieToSave.title = title;
    movieToSave.director = director;
    movieToSave.releaseDate = releaseDate;
    movieToSave.openingCrawl = openingCrawl;

    return this.movieRepository.save(movieToSave);
  }

  async updateById(
    id: number,
    movieData: IUpdateMovieInput,
  ): Promise<MovieEntity> {
    await this.movieRepository.update(id, movieData);
    return this.findById(id);
  }

  async deleteById(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
}

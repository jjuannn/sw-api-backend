import { MovieEntity } from '../entity/movie.entity';
import { ICreateMovieInput } from './input/create-movie.input.interface';
import { IUpdateMovieInput } from './input/update-movie.input.interface';

export interface IMovieRepository {
  findAll(): Promise<MovieEntity[]>;
  findById(id: number): Promise<MovieEntity>;
  create(movieData: ICreateMovieInput): Promise<MovieEntity>;
  updateById(id: number, movieData: IUpdateMovieInput): Promise<MovieEntity>;
  deleteById(id: number): Promise<void>;
}

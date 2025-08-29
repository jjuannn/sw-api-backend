import { CreateMovieDto } from '../../controller/dto/create-movie.dto';
import { UpdateMovieDto } from '../../controller/dto/update-movie.dto';
import { MovieEntity } from '../../repository/movie.entity';

export interface IMovieService {
  create(createMovieDto: CreateMovieDto): Promise<MovieEntity>;
  findAll(): Promise<MovieEntity[]>;
  findById(id: number): Promise<MovieEntity>;
  updateById(id: number, updateMovieDto: UpdateMovieDto): Promise<MovieEntity>;
  deleteById(id: number): Promise<void>;
}

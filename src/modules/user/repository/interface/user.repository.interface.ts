import { UserEntity } from '../entity/user.entity';
import { ICreateUserInput } from './input/create-user.input.interface';

export interface IUserRepository {
  create(userData: ICreateUserInput): Promise<UserEntity>;
  getByEmail(email: string): Promise<UserEntity>;
}

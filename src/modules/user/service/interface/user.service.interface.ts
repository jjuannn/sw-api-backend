import { UserEntity } from '../../repository/entity/user.entity';
import { ICreateUserInput } from './input/create-user.input.interface';

export interface IUserService {
  create(createUserData: ICreateUserInput): Promise<UserEntity>;
  getByEmail(email: string): Promise<UserEntity>;
}

import { UserEntity } from '../../repository/user.entity';
import { ICreateUserInput } from './create-user.input.interface';

export interface IUserService {
  create(createUserData: ICreateUserInput): Promise<UserEntity>;
  getByEmail(email: string): Promise<UserEntity>;
}

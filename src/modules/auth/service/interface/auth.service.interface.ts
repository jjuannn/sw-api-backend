import { LoginUserDto } from '../../controller/dto/login-user.dto';
import { RegisterUserDto } from '../../controller/dto/register-user.dto';
import { ILoginUserOutput } from './login-user.output.interface';
import { IRegisterUserOutput } from './register-user.output.interface';

export interface IAuthService {
  register(registerUserDto: RegisterUserDto): Promise<IRegisterUserOutput>;
  login(loginUserDto: LoginUserDto): Promise<ILoginUserOutput>;
}

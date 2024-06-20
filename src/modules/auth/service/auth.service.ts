import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../controller/dto/register-user.dto';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../controller/dto/login-user.dto';
import { EncryptService } from '../../encrypt/service/encrypt.service';
import {
  InvalidCredentialsError,
  UserAlreadyExistsError,
} from './error/auth.service.error';
import { IRegisterUserOutput } from './interface/output/register-user.output.interface';
import { ILoginUserOutput } from './interface/output/login-user.output.interface';
import { IGenerateAccessTokenPayloadInput } from './interface/input/generate-access-token-payload.input.interface';
import { IAuthService } from './interface/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly encryptService: EncryptService,
  ) {}

  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<IRegisterUserOutput> {
    const { email, password } = registerUserDto;

    const storedUser = await this.userService.getByEmail(email);

    if (storedUser) {
      throw new UserAlreadyExistsError();
    }

    const userCreated = await this.userService.create({ email, password });

    const accessToken = await this.generateAccessToken({
      email: userCreated.email,
      id: userCreated.id,
      role: userCreated.role,
    });

    return { accessToken };
  }

  async login(loginUserDto: LoginUserDto): Promise<ILoginUserOutput> {
    const storedUser = await this.userService.getByEmail(loginUserDto.email);

    if (!storedUser) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await this.encryptService.compare(
      loginUserDto.password,
      storedUser.password,
    );

    if (isPasswordValid) {
      const accessToken = await this.generateAccessToken({
        email: loginUserDto.email,
        id: storedUser.id,
        role: storedUser.role,
      });

      return { accessToken };
    }

    throw new InvalidCredentialsError();
  }

  private generateAccessToken(
    payload: IGenerateAccessTokenPayloadInput,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
  }
}

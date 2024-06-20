import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @ApiProperty({
    example: 'user@example.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'password123',
  })
  password: string;
}

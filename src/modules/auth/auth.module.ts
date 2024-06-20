import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UserModule } from '../user/user.module';
import { EncryptModule } from '../encrypt/encrypt.module';

@Module({
  imports: [UserModule, EncryptModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

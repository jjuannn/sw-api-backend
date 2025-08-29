import { Module } from '@nestjs/common';
import { JwtStrategy } from './controller/jwt/jwt.strategy';
import { EncryptService } from './service/encrypt.service';

@Module({
  providers: [JwtStrategy, EncryptService],
  exports: [EncryptService],
})
export class CommonModule {}

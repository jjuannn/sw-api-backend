import { Module } from '@nestjs/common';
import { JwtStrategy } from './controller/jwt/jwt.strategy';

@Module({
  providers: [JwtStrategy],
})
export class CommonModule {}

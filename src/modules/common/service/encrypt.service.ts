import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IEncryptService } from './interface/encrypt.service.interface';

@Injectable()
export class EncryptService implements IEncryptService {
  async encrypt(value: string): Promise<string> {
    const rounds = 10;
    return await bcrypt.hash(value, rounds);
  }

  async compare(value: string, encryptedValue: string): Promise<boolean> {
    return await bcrypt.compare(value, encryptedValue);
  }
}

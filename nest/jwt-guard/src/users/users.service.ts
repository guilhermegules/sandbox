import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  findOne(email: string): User | undefined {
    return [
      {
        id: '1',
        email: 'user@test.com',
        role: 'admin',
      },
      {
        id: '2',
        email: 'user@test2.com',
        role: 'user',
      },
    ].find((user) => user.email === email);
  }
}

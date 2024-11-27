import * as argon from 'argon2';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from '../users';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await argon.verify(user.password, pass))) {
      delete user.password;
      return user;
    }
    return null;
  }
}

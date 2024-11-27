import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from '../users';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      // TODO add encryption with salt
      return user;
    }
    return null;
  }
}

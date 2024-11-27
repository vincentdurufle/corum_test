import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { LocalAuthGuard } from './auth';

@Controller()
export class AppController {
  constructor() {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: Request & { user: User }) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req: Request & { logout: () => Promise<void> }) {
    return req.logout();
  }
}

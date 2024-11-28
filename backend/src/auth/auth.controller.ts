import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Public } from '../common/decorators';
import { JwtAuthGuard, LocalAuthGuard } from '../common/guards';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: Request & { user: User }) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: Request & { user: User }) {
    return req.user;
  }
}

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET /users/me
  @UseGuards(JwtAuthGuard)
  @Get("me")
  getMe(@Req() req) {
    return req.user; // comes from JWT payload
  }
}

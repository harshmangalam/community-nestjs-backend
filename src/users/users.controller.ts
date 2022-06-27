import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtGuard } from '../auth/guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  getCurrentUser(@CurrentUser('id') userId: string) {
    return this.usersService.getCurrentUser(userId);
  }
}

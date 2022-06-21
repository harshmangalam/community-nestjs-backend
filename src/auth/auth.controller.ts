import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthSignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: AuthLoginDto) {
    return this.authService.login(body);
  }

  @Post('signup')
  signup(@Body() body: AuthSignupDto) {
    return this.authService.signup(body);
  }

  @Get('me')
  getMe() {
    return { user: null };
  }
}

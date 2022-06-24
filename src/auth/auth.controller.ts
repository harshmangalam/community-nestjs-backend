import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthSignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: AuthLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.authService.login(body);
    response.cookie('token', data.token);
    return data
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

import { Injectable } from '@nestjs/common';
import { AuthLoginDto, AuthSignupDto } from './dto';



@Injectable()
export class AuthService {
  signup(body: AuthSignupDto) {
    return body;
  }

  login(body: AuthLoginDto) {
    return body;
  }
}

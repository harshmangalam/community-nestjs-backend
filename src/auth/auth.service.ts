import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthLoginDto, AuthSignupDto } from './dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signup({ email, name, password }: AuthSignupDto) {
    try {
      // check user exists or not
      const findUser = await this.prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (findUser) {
        throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
      }
      // generate hash password
      const hashPassword = await argon2.hash(password);

      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      });

      return {
        user,
      };
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }: AuthLoginDto) {
    // check user exists
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw new HttpException('Invalid credential', HttpStatus.BAD_REQUEST);
    }

    // verify password

    const verifyPassword = await argon2.verify(user.password, password);

    if (!verifyPassword) {
      throw new HttpException('Invalid credential', HttpStatus.BAD_REQUEST);
    }

    // generate jwt token
    const token = await this.jwtService.signAsync(
      {
        userId: user.id,
      },
      {
        expiresIn: '10m',
        secret: this.config.get('JWT_SECRET'),
      },
    );

    return token;
  }
}

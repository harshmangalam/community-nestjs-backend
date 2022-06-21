import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthSignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  password: string;
}

import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2, { message: 'Password must have at least 2 characters.' }) // TODO add more requirements for password
  password: string;
}

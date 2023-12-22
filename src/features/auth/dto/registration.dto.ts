import { IsEmail, IsString, Length, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { CheckEmailInDb } from '../validators/check.email.in.db';

export class RegistrationDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(3, 20)
  fullName: string;
  @Transform(({ value }) => value.trim())
  @IsEmail()
  @Validate(CheckEmailInDb, {
    message: 'Пользователь с таким email уже существует',
  })
  email: string;
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(3, 20)
  password: string;
}

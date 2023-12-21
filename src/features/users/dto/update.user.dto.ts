import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { CheckEmailInDb } from '../../auth/validators/check.email.in.db';

export class UpdateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(3, 20)
  @IsOptional()
  fullName: string;
  @Transform(({ value }) => value.trim())
  @IsEmail()
  @Validate(CheckEmailInDb, {
    message: 'Пользователь с таким email уже существует',
  })
  @IsOptional()
  email: string;
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(3, 20)
  @IsOptional()
  password: string;
  @IsOptional()
  avatar: string;
  @IsOptional()
  follow: boolean;
  @IsOptional()
  status: string;
  @IsOptional()
  country: string;
  @IsOptional()
  city: string;
}

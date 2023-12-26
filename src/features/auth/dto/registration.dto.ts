import { IsEmail, IsString, Length, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { CheckEmailInDb } from '../validators/check.email.in.db';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(3, 20)
  @ApiProperty({
    type: 'string',
    minimum: 3,
    maximum: 20,
  })
  fullName: string;
  @Transform(({ value }) => value.trim())
  @IsEmail()
  @Validate(CheckEmailInDb, {
    message: 'Пользователь с таким email уже существует',
  })
  @ApiProperty({
    type: 'string',
  })
  email: string;
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(3, 20)
  @ApiProperty({
    type: 'string',
    minimum: 3,
    maximum: 20,
  })
  password: string;
}

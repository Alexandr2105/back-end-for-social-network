import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { CheckEmailInDb } from '../../auth/validators/check.email.in.db';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(3, 20)
  @IsOptional()
  @ApiProperty({ type: 'string', description: 'Full name' })
  fullName: string;
  @Transform(({ value }) => value.trim())
  @IsEmail()
  @Validate(CheckEmailInDb, {
    message: 'Пользователь с таким email уже существует',
  })
  @IsOptional()
  @ApiProperty({ type: 'string', description: 'Email' })
  email: string;
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(3, 20)
  @IsOptional()
  @ApiProperty({ type: 'string', description: 'Password' })
  password: string;
  @IsOptional()
  @ApiProperty({ type: 'string', description: 'Path' })
  avatar: string;
  @IsOptional()
  @ApiProperty({ type: 'boolean' })
  follow: boolean;
  @IsOptional()
  @ApiProperty({ type: 'string' })
  status: string;
  @IsOptional()
  @ApiProperty({ type: 'string' })
  country: string;
  @IsOptional()
  @ApiProperty({ type: 'string' })
  city: string;
}

import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ type: 'string', description: 'Email' })
  @Transform(({ value }) => value.trim())
  @IsEmail()
  email: string;
  @ApiProperty({ type: 'string', description: 'Password' })
  @IsString()
  @Transform(({ value }) => value.trim())
  password: string;
}

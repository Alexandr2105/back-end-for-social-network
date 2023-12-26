import { Validate } from 'class-validator';
import { CheckUserIdInDb } from '../validators/check.user.id.in.db';
import { ApiProperty } from '@nestjs/swagger';

export class UserIdDto {
  @ApiProperty({ type: 'string', description: 'User id' })
  @Validate(CheckUserIdInDb)
  userId: string;
}

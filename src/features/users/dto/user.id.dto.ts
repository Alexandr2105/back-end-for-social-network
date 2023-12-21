import { Validate } from 'class-validator';
import { CheckUserIdInDb } from '../validators/check.user.id.in.db';

export class UserIdDto {
  @Validate(CheckUserIdInDb)
  userId: string;
}

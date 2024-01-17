import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersQueryRepository } from '../users.query.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class CheckUserIdInDb implements ValidatorConstraintInterface {
  constructor(private readonly usersQueryRepository: UsersQueryRepository) {}

  async validate(userId: string): Promise<boolean> {
    if (isNaN(+userId))
      throw new BadRequestException({ message: 'Not NaN', field: 'userId' });
    const user = await this.usersQueryRepository.getUserById(+userId);
    if (user === null) {
      throw new NotFoundException();
    } else {
      return true;
    }
  }
}

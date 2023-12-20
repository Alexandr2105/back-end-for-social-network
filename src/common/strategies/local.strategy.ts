import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BcryptService } from '../bcript/bcript.service';
import { Strategy } from 'passport-local';
import { UsersQueryRepository } from '../../features/users/users.query.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly genHash: BcryptService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.usersQueryRepository.getUserByEmail(email);
    if (!user) return false;
    const hashPassword = await this.genHash.generateHash(
      password,
      user.password,
    );

    if (user.password === hashPassword) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}

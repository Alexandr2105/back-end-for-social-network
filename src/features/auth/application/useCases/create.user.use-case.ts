import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BcryptService } from '../../../../common/bcript/bcript.service';
import { UserEntity } from '../../../users/entites/users.entity';
import { UsersRepository } from '../../../users/users.repository';
import { RegistrationDto } from '../../dto/registration.dto';

export class CreateUserCommand {
  constructor(public userDto: RegistrationDto) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private bcryptService: BcryptService,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserEntity> {
    const password = command.userDto.password;
    const hashPassword =
      await this.bcryptService.generateHashForNewUser(password);
    const newUser = new UserEntity();
    newUser.createdAt = new Date().toISOString();
    newUser.password = hashPassword;
    newUser.email = command.userDto.email;
    newUser.fullName = command.userDto.fullName;
    return this.usersRepository.createUser(newUser);
  }
}

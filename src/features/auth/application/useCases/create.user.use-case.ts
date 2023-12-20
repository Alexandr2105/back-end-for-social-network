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
    // const user = await this.usersRepository.getUserByEmail(
    //   command.userDto.email,
    // );
    // if (user)
    //   throw new BadRequestException({
    //     message: 'Такой email уже сущуствует',
    //     field: 'email',
    //   });
    const password = command.userDto.password;
    const hashPassword =
      await this.bcryptService.generateHashForNewUser(password);
    const newUser = new UserEntity();
    newUser.createdAt = new Date().toISOString();
    newUser.password = hashPassword;
    newUser.email = command.userDto.email;
    newUser.fullName = command.userDto.fullName;
    newUser.avatar = command.userDto.avatar;
    newUser.city = command.userDto.city;
    newUser.country = command.userDto.country;
    return this.usersRepository.createUser(newUser);
  }
}

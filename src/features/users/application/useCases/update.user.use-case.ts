import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../users.repository';
import { UpdateUserDto } from '../../dto/update.user.dto';

export class UpdateUserCommand {
  constructor(
    public userId: string,
    public body: UpdateUserDto,
  ) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserUseCase implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: UpdateUserCommand): Promise<boolean> {
    const userId = +command.userId;
    const result = await this.usersRepository.updateUser(userId, command.body);
    return result.affected === 1;
  }
}

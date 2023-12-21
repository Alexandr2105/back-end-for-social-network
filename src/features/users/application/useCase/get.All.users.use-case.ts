import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersQueryRepository } from '../../users.query.repository';
import { UserEntity } from '../../entites/users.entity';

export class GetAllUsersCommand {
  constructor() {}
}

@CommandHandler(GetAllUsersCommand)
export class GetAllUsersUseCase implements ICommandHandler<GetAllUsersCommand> {
  constructor(private readonly usersQueryRepository: UsersQueryRepository) {}

  async execute(): Promise<UserEntity[]> {
    return this.usersQueryRepository.getAllUsers();
  }
}

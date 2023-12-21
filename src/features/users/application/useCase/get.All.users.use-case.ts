import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersQueryRepository } from '../../users.query.repository';
import { UserEntity } from '../../entites/users.entity';
import { query } from 'express';
import { QueryUserViewModel } from '../../viewModels/query.user.view.model';

export class GetAllUsersCommand {
  constructor(public queryParam: any) {}
}

@CommandHandler(GetAllUsersCommand)
export class GetAllUsersUseCase implements ICommandHandler<GetAllUsersCommand> {
  constructor(private readonly usersQueryRepository: UsersQueryRepository) {}

  async execute(command: GetAllUsersCommand): Promise<QueryUserViewModel> {
    return this.usersQueryRepository.getAllUsers(command.queryParam);
  }
}

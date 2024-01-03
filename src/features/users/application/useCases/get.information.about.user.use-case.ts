import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersQueryRepository } from '../../users.query.repository';
import { UserViewModel } from '../../viewModels/user.view.model';

export class GetInformationAboutCommand {
  constructor(public userId: number) {}
}

@CommandHandler(GetInformationAboutCommand)
export class GetInformationAboutUserUseCase
  implements ICommandHandler<GetInformationAboutCommand>
{
  constructor(private readonly usersQueryRepository: UsersQueryRepository) {}

  async execute(command: GetInformationAboutCommand): Promise<UserViewModel> {
    return this.usersQueryRepository.getUserById(command.userId);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProfileQueryRepository } from '../../profile.query.repository';
import { ProfileEntity } from '../../entities/profile.entity';

export class GetProfileForCurrentUserCommand {
  constructor(public userId: string) {}
}

@CommandHandler(GetProfileForCurrentUserCommand)
export class GetProfileForCurrentUserUseCase
  implements ICommandHandler<GetProfileForCurrentUserCommand>
{
  constructor(
    private readonly profileQueryRepository: ProfileQueryRepository,
  ) {}

  async execute(
    command: GetProfileForCurrentUserCommand,
  ): Promise<ProfileEntity> {
    return this.profileQueryRepository.getProfileInfo(+command.userId);
  }
}

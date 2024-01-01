import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersQueryRepository } from '../../users.query.repository';
import { QueryUserViewModel } from '../../viewModels/query.user.view.model';
import { FollowerRepository } from '../../../followers/follower.repository';

export class GetAllUsersCommand {
  constructor(
    public queryParam: any,
    public userId: number,
  ) {}
}

@CommandHandler(GetAllUsersCommand)
export class GetAllUsersUseCase implements ICommandHandler<GetAllUsersCommand> {
  constructor(
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly followerRepository: FollowerRepository,
  ) {}

  async execute(command: GetAllUsersCommand): Promise<QueryUserViewModel> {
    const users = await this.usersQueryRepository.getAllUsers(
      command.queryParam,
    );
    const follows = await this.followerRepository.getFollows(command.userId);

    for (const item of users.items) {
      for (const follow of follows) {
        if (command.userId && item.id === follow.followId) {
          item.follow = true;
        }
      }
    }
    return users;
  }
}

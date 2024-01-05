import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersQueryRepository } from '../../users.query.repository';
import { QueryUserViewModel } from '../../viewModels/query.user.view.model';
import { FollowerRepository } from '../../../followers/follower.repository';
import { QueryHelper } from '../../../../common/helper/query.helper';
import { ServiceJwt } from '../../../auth/service.jwt';

export class GetAllUsersCommand {
  constructor(
    public queryParam: any,
    public refreshCode: string,
  ) {}
}

@CommandHandler(GetAllUsersCommand)
export class GetAllUsersUseCase implements ICommandHandler<GetAllUsersCommand> {
  constructor(
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly followerRepository: FollowerRepository,
    private readonly queryHelper: QueryHelper,
    private readonly serviceJwt: ServiceJwt,
  ) {}

  async execute(command: GetAllUsersCommand): Promise<QueryUserViewModel> {
    const queryParam = this.queryHelper.queryParamHelper(command.queryParam);
    const userId = await this.serviceJwt.getUserByRefreshCode(
      command.refreshCode,
    );
    const users = await this.usersQueryRepository.getAllUsers(queryParam);
    const follows = await this.followerRepository.getFollows(userId);

    for (const item of users.items) {
      for (const follow of follows) {
        if (userId && item.id === follow.followId) {
          item.follow = true;
        }
      }
    }
    return users;
  }
}

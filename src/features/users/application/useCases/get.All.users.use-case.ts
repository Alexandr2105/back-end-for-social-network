import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersQueryRepository } from '../../users.query.repository';
import { QueryUserViewModel } from '../../viewModels/query.user.view.model';
import { FollowerRepository } from '../../../followers/follower.repository';
import { QueryHelper } from '../../../../common/helper/query.helper';
import { ServiceJwt } from '../../../auth/service.jwt';
import { DevicesRepository } from '../../../devices/devices.repository';

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
    private readonly devicesRepository: DevicesRepository,
  ) {}

  async execute(command: GetAllUsersCommand): Promise<QueryUserViewModel> {
    const queryParam = this.queryHelper.queryParamHelper(command.queryParam);
    const info = await this.serviceJwt.getRefreshTokenInformationByRefreshCode(
      command.refreshCode,
    );
    const checkDevice = await this.devicesRepository.getCurrentDeviceByDeviceId(
      info.deviceId,
    );

    const users = await this.usersQueryRepository.getAllUsers(queryParam);
    const follows = await this.followerRepository.getFollows(info?.userId);

    if (checkDevice && info.exp === checkDevice.exp) {
      for (const item of users.items) {
        for (const follow of follows) {
          if (info?.userId && item.id === follow.followId) {
            item.follow = true;
          }
        }
      }
      return users;
    } else {
      return users;
    }
  }
}

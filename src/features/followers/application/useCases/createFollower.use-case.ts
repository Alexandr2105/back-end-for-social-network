import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FollowerRepository } from '../../follower.repository';
import { FollowersEntity } from '../../entities/followers.entity';

export class CreateFollowerCommand {
  constructor(
    public userId: string,
    public followerId: string,
  ) {}
}

@CommandHandler(CreateFollowerCommand)
export class CreateFollowerUseCase
  implements ICommandHandler<CreateFollowerCommand>
{
  constructor(private readonly followerRepository: FollowerRepository) {}

  async execute(command: CreateFollowerCommand): Promise<FollowersEntity> {
    const data = new FollowersEntity();
    data.userId = +command.userId;
    data.followId = +command.followerId;
    data.createdAt = new Date().toISOString();
    return this.followerRepository.createFollower(data);
  }
}

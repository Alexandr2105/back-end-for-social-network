import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FollowerRepository } from '../../follower.repository';

export class DeleteFollowerCommand {
  constructor(
    public userId: string,
    public followerId: string,
  ) {}
}

@CommandHandler(DeleteFollowerCommand)
export class DeleteFollowerUseCase
  implements ICommandHandler<DeleteFollowerCommand>
{
  constructor(private readonly followerRepository: FollowerRepository) {}

  async execute(command: DeleteFollowerCommand): Promise<boolean> {
    const result = await this.followerRepository.deleteFollower(
      +command.userId,
      +command.followerId,
    );
    return result.affected === 1;
  }
}

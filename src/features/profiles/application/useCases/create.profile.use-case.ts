import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProfileDto } from '../../dto/profile.dto';
import { ProfileRepository } from '../../profile.repository';
import { ProfileEntity } from '../../entities/profile.entity';
import { UsersQueryRepository } from '../../../users/users.query.repository';
import { NotFoundException } from '@nestjs/common';

export class CreateProfileCommand {
  constructor(
    public userId: string,
    public body: ProfileDto,
  ) {}
}

@CommandHandler(CreateProfileCommand)
export class CreateProfileUseCase
  implements ICommandHandler<CreateProfileCommand>
{
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly usersQueryRepository: UsersQueryRepository,
  ) {}

  async execute(command: CreateProfileCommand): Promise<ProfileEntity> {
    const user = await this.usersQueryRepository.getUserById(+command.userId);
    if (user === null) throw new NotFoundException();
    const profile = new ProfileEntity();
    profile.city = command.body.city;
    profile.status = command.body.status;
    profile.country = command.body.country;
    profile.userId = +command.userId;
    profile.lookingForAJobDescription = command.body.lookingForAJobDescription;
    profile.avatar = command.body.avatar;
    profile.lookingForAJob = command.body.lookingForAJob;
    user.prifile = profile;
    return this.profileRepository.createProfile(profile);
  }
}

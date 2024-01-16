import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProfileDto } from '../../dto/profile.dto';
import { ProfileRepository } from '../../profile.repository';
import { ProfileEntity } from '../../entities/profile.entity';
import { ProfileQueryRepository } from '../../profile.query.repository';

export class CreateOrUpdateProfileCommand {
  constructor(
    public userId: string,
    public body: ProfileDto,
  ) {}
}

@CommandHandler(CreateOrUpdateProfileCommand)
export class CreateOrUpdateProfileUseCase
  implements ICommandHandler<CreateOrUpdateProfileCommand>
{
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly profileQueryRepository: ProfileQueryRepository,
  ) {}

  async execute(command: CreateOrUpdateProfileCommand): Promise<ProfileEntity> {
    const profileInfo = await this.profileQueryRepository.getProfileInfo(
      +command.userId,
    );
    if (profileInfo) {
      profileInfo.city = command.body.city;
      profileInfo.status = command.body.status;
      profileInfo.country = command.body.country;
      profileInfo.lookingForAJobDescription =
        command.body.lookingForAJobDescription;
      profileInfo.avatar = command.body.avatar;
      profileInfo.lookingForAJob = command.body.lookingForAJob;
      return this.profileRepository.createOrUpdateProfile(profileInfo);
    } else {
      const newProfile = new ProfileEntity();
      newProfile.city = command.body.city;
      newProfile.status = command.body.status;
      newProfile.country = command.body.country;
      newProfile.userId = +command.userId;
      newProfile.lookingForAJobDescription =
        command.body.lookingForAJobDescription;
      newProfile.avatar = command.body.avatar;
      newProfile.lookingForAJob = command.body.lookingForAJob;
      return this.profileRepository.createOrUpdateProfile(newProfile);
    }
  }
}

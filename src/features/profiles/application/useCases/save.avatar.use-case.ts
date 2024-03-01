import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { resizePhoto } from '../../../../common/helper/resize.photo';
import { FileStorageAdapterS3 } from '../../../../common/adapters/file.storage.adapter.s3';
import { ProfileRepository } from '../../profile.repository';
import { settings } from '../../../../common/helper/settings';
import { BadRequestException } from '@nestjs/common';

export class SaveAvatarCommand {
  constructor(
    public userId: number,
    public avatar: any,
  ) {}
}

@CommandHandler(SaveAvatarCommand)
export class SaveAvatarUseCase implements ICommandHandler<SaveAvatarCommand> {
  constructor(
    private readonly fileStorageAdapterS3: FileStorageAdapterS3,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async execute(command: SaveAvatarCommand): Promise<any> {
    const avatarData = await resizePhoto(command.avatar.buffer);
    const information = await this.fileStorageAdapterS3.saveAvatar(
      command.userId,
      avatarData,
    );
    if (information) {
      const avatarUrl = `${settings.CURRENT_APP_BASE_URL}/${information.bucket}/${information.key}`;
      const result = await this.profileRepository.updateAvatar(
        command.userId,
        avatarUrl,
      );
      if (!result) {
        throw new BadRequestException({
          field: 'avatar',
          message: 'Avatar not saved',
        });
      }
    } else {
      throw new BadRequestException({
        field: 'avatar',
        message: 'Avatar not saved',
      });
    }
  }
}

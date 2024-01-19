import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenDataEntity } from '../entities/refresh.token.data.entity';
import { ServiceJwt } from '../../auth/service.jwt';
import { DevicesRepository } from '../devices.repository';

export class SaveInfoAboutUserDevicesCommand {
  constructor(
    public refreshToken: string,
    public deviceName: string,
    public ip: string,
  ) {}
}

@CommandHandler(SaveInfoAboutUserDevicesCommand)
export class SaveInfoAboutUserDevicesUseCase
  implements ICommandHandler<SaveInfoAboutUserDevicesCommand>
{
  constructor(
    private readonly serviceJwt: ServiceJwt,
    private readonly devicesRepository: DevicesRepository,
  ) {}

  async execute(
    command: SaveInfoAboutUserDevicesCommand,
  ): Promise<RefreshTokenDataEntity> {
    const deviceInfo = new RefreshTokenDataEntity();
    const refreshInfo = this.serviceJwt.getRefreshTokenInformationByRefreshCode(
      command.refreshToken,
    );
    deviceInfo.deviceId = refreshInfo.deviceId;
    deviceInfo.exp = refreshInfo.exp;
    deviceInfo.iat = refreshInfo.iat;
    deviceInfo.userId = refreshInfo.userId;
    deviceInfo.dateCreate = new Date();
    deviceInfo.deviceName = command.deviceName;
    deviceInfo.ip = command.ip;
    await this.devicesRepository.deleteOldDevices();
    return this.devicesRepository.save(deviceInfo);
  }
}

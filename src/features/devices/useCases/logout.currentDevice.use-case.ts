import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DevicesRepository } from '../devices.repository';

export class LogoutCurrentDeviceCommand {
  constructor(
    public userId: number,
    public deviceId: string,
    public exp: number,
  ) {}
}

@CommandHandler(LogoutCurrentDeviceCommand)
export class LogoutCurrentDeviceUseCase
  implements ICommandHandler<LogoutCurrentDeviceCommand>
{
  constructor(private readonly devicesRepository: DevicesRepository) {}

  async execute(command: LogoutCurrentDeviceCommand): Promise<any> {
    await this.devicesRepository.deleteCurrentDevice(
      command.userId,
      command.deviceId,
      command.exp,
    );
  }
}

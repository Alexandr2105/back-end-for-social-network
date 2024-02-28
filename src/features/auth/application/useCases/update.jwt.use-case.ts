import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ServiceJwt } from '../../service.jwt';
import { SaveInfoAboutUserDevicesCommand } from '../../../devices/useCases/save.info.about.user.devices.use-case';

export class UpdateJwtCommand {
  constructor(
    public userId: number,
    public ip: string,
    public deviceName: string,
    public deviceId: string,
  ) {}
}

@CommandHandler(UpdateJwtCommand)
export class UpdateJwtUseCase implements ICommandHandler<UpdateJwtCommand> {
  constructor(
    private readonly jwtService: ServiceJwt,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: UpdateJwtCommand): Promise<any> {
    const accessToken = this.jwtService.creatJWT(
      command.userId,
      command.deviceId,
    );
    const refreshToken = this.jwtService.creatRefreshJWT(
      command.userId,
      command.deviceId,
    );
    const result = await this.commandBus.execute(
      new SaveInfoAboutUserDevicesCommand(
        refreshToken,
        command.deviceName,
        command.ip,
      ),
    );
    if (result) return { accessToken, refreshToken };
    return result;
  }
}

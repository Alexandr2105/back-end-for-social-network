import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ServiceJwt } from '../../service.jwt';
import { randomUUID } from 'crypto';
import { SaveInfoAboutUserDevicesCommand } from '../../../devices/useCases/save.info.about.user.devices.use-case';

export class CreateJwtCommand {
  constructor(
    public userId: number,
    public ip: string,
    public deviceName: string,
  ) {}
}

@CommandHandler(CreateJwtCommand)
export class CreateJwtUseCase implements ICommandHandler<CreateJwtCommand> {
  constructor(
    private readonly jwtService: ServiceJwt,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: CreateJwtCommand): Promise<any> {
    const deviceId = randomUUID();
    const accessToken = this.jwtService.creatJWT(command.userId, deviceId);
    const refreshToken = this.jwtService.creatRefreshJWT(
      command.userId,
      deviceId,
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

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ServiceJwt } from '../../service.jwt';

export class CreateJwtCommand {
  constructor(public userId: string) {}
}

@CommandHandler(CreateJwtCommand)
export class CreateJwtUseCase implements ICommandHandler<CreateJwtCommand> {
  constructor(private readonly jwtService: ServiceJwt) {}

  async execute(command: CreateJwtCommand): Promise<any> {
    const accessToken = this.jwtService.creatJWT(command.userId);
    const refreshToken = this.jwtService.creatRefreshJWT(command.userId);
    return { accessToken, refreshToken };
  }
}

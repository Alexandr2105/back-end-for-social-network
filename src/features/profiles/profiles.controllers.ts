import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrUpdateProfileCommand } from './application/useCases/create.or.update.profile.use-case';
import { ProfileDto } from './dto/profile.dto';
import { ProfileEntity } from './entities/profile.entity';
import { UserIdDto } from '../users/dto/user.id.dto';

@Controller('profile')
export class ProfilesControllers {
  constructor(private readonly commandCommandBus: CommandBus) {}

  @Post(':userId')
  async createProfile(
    @Body() body: ProfileDto,
    @Param() param: UserIdDto,
  ): Promise<ProfileEntity> {
    return this.commandCommandBus.execute(
      new CreateOrUpdateProfileCommand(param, body),
    );
  }
}

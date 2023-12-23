import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProfileCommand } from './application/useCases/create.profile.use-case';
import { ProfileDto } from './dto/profile.dto';
import { ProfileEntity } from './entities/profile.entity';

@Controller('profile')
export class ProfilesControllers {
  constructor(private readonly commandCommandBus: CommandBus) {}

  @Post(':userId')
  async createProfile(
    @Body() body: ProfileDto,
    @Param('userId') userId: string,
  ): Promise<ProfileEntity> {
    return this.commandCommandBus.execute(
      new CreateProfileCommand(userId, body),
    );
  }
}

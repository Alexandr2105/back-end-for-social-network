import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrUpdateProfileCommand } from './application/useCases/create.or.update.profile.use-case';
import { ProfileDto } from './dto/profile.dto';
import { ProfileEntity } from './entities/profile.entity';
import { UserIdDto } from '../users/dto/user.id.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerDecoratorByCreateOrUpdateProfile } from './swagger/swagger.profile.decorators';
import { GetProfileForCurrentUserCommand } from './application/useCases/get.profile.for.current.user.use-case';

@ApiTags('Profile')
@Controller('profile')
export class ProfilesControllers {
  constructor(private readonly commandCommandBus: CommandBus) {}

  @SwaggerDecoratorByCreateOrUpdateProfile()
  @Post(':userId')
  async createOrUpdateProfile(
    @Body() body: ProfileDto,
    @Param() param: UserIdDto,
  ): Promise<ProfileEntity> {
    return this.commandCommandBus.execute(
      new CreateOrUpdateProfileCommand(param, body),
    );
  }

  @Get(':userId')
  async getProfile(@Param() param: UserIdDto): Promise<ProfileEntity> {
    return this.commandCommandBus.execute(
      new GetProfileForCurrentUserCommand(param.userId),
    );
  }
}

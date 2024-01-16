import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrUpdateProfileCommand } from './application/useCases/create.or.update.profile.use-case';
import { ProfileDto } from './dto/profile.dto';
import { ProfileEntity } from './entities/profile.entity';
import { UserIdDto } from '../users/dto/user.id.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  SwaggerDecoratorByCreateOrUpdateProfile,
  SwaggerDecoratorByGetProfile,
} from './swagger/swagger.profile.decorators';
import { GetProfileForCurrentUserCommand } from './application/useCases/get.profile.for.current.user.use-case';
import { RefreshAuthGuard } from '../../common/guards/refresh.auth.guard';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly commandCommandBus: CommandBus) {}

  @SwaggerDecoratorByCreateOrUpdateProfile()
  @UseGuards(RefreshAuthGuard)
  @Post()
  async createOrUpdateProfile(
    @Body() body: ProfileDto,
    @Req() req: any,
  ): Promise<ProfileEntity> {
    return this.commandCommandBus.execute(
      new CreateOrUpdateProfileCommand(req.user.userId, body),
    );
  }

  @SwaggerDecoratorByGetProfile()
  @Get(':userId')
  async getProfile(@Param() param: UserIdDto): Promise<ProfileEntity> {
    return this.commandCommandBus.execute(
      new GetProfileForCurrentUserCommand(param.userId),
    );
  }
}

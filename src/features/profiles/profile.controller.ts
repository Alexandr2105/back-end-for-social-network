import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
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
  SwaggerDecoratorByPostSaveAvatar,
} from './swagger/swagger.profile.decorators';
import { GetProfileForCurrentUserCommand } from './application/useCases/get.profile.for.current.user.use-case';
import { JwtAuthGuard } from '../../common/guards/jwt.auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { SaveAvatarCommand } from './application/useCases/save.avatar.use-case';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly commandCommandBus: CommandBus) {}

  @SwaggerDecoratorByCreateOrUpdateProfile()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getProfile(@Param() param: UserIdDto): Promise<ProfileEntity> {
    return this.commandCommandBus.execute(
      new GetProfileForCurrentUserCommand(param.userId),
    );
  }

  @UseGuards(JwtAuthGuard)
  @SwaggerDecoratorByPostSaveAvatar()
  @Post('save-avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async saveAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @Req() req: any,
  ): Promise<string> {
    return this.commandCommandBus.execute(
      new SaveAvatarCommand(req.user.userId, avatar),
    );
  }
}

import {
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserIdDto } from '../users/dto/user.id.dto';
import { CreateFollowerCommand } from './application/useCases/createFollower.use-case';
import { DeleteFollowerCommand } from './application/useCases/deleteFollower.use-case';
import { FollowersEntity } from './entities/followers.entity';
import { RefreshAuthGuard } from '../../common/guards/refresh.auth.guard';

@Controller('followers')
export class FollowersController {
  constructor(private readonly commandBus: CommandBus) {}

  // @UseGuards(JwtAuthGuard)
  @UseGuards(RefreshAuthGuard)
  @HttpCode(201)
  @Post(':userId')
  async createFollower(
    @Param() param: UserIdDto,
    @Req() req: any,
  ): Promise<FollowersEntity> {
    return this.commandBus.execute(
      // new CreateFollowerCommand(req.user.id, param.userId),
      new CreateFollowerCommand(req.user.userId, param.userId),
    );
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(RefreshAuthGuard)
  @Delete(':userId')
  @HttpCode(204)
  async deleteFollower(
    @Param() param: UserIdDto,
    @Req() req: any,
  ): Promise<boolean> {
    return this.commandBus.execute(
      // new DeleteFollowerCommand(req.user.id, param.userId),
      new DeleteFollowerCommand(req.user.userId, param.userId),
    );
  }
}

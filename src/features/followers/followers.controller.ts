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
import { JwtAuthGuard } from '../../common/guards/jwt.auth.guard';
import { FollowersEntity } from './entities/followers.entity';

@Controller('followers')
export class FollowersController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @Post(':userId')
  async createFollower(
    @Param() param: UserIdDto,
    @Req() req: any,
  ): Promise<FollowersEntity> {
    return this.commandBus.execute(
      new CreateFollowerCommand(req.user.id, param.userId),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  @HttpCode(204)
  async deleteFollower(
    @Param() param: UserIdDto,
    @Req() req: any,
  ): Promise<boolean> {
    return this.commandBus.execute(
      new DeleteFollowerCommand(req.user.id, param.userId),
    );
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetAllUsersCommand } from './application/useCases/get.All.users.use-case';
import { UpdateUserCommand } from './application/useCases/update.user.use-case';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserIdDto } from './dto/user.id.dto';
import { DeleteUserCommand } from './application/useCases/delete.user.use-case';
import { QueryHelper } from '../../common/helper/query.helper';
import { QueryUserViewModel } from './viewModels/query.user.view.model';
import { ApiTags } from '@nestjs/swagger';
import {
  SwaggerDecoratorByDeleteUser,
  SwaggerDecoratorByGetAllUsers,
  SwaggerDecoratorByUpdateUser,
} from './swagger/swagger.users.decorators';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly commandCommandBus: CommandBus,
    private readonly queryHelper: QueryHelper,
  ) {}

  @SwaggerDecoratorByGetAllUsers()
  @Get()
  async getAllUsers(@Query() query: any): Promise<QueryUserViewModel> {
    const queryParam = this.queryHelper.queryParamHelper(query);
    return this.commandCommandBus.execute(new GetAllUsersCommand(queryParam));
  }

  @SwaggerDecoratorByUpdateUser()
  @Put(':userId')
  async updateUser(
    @Param() param: UserIdDto,
    @Body() body: UpdateUserDto,
  ): Promise<boolean> {
    return this.commandCommandBus.execute(
      new UpdateUserCommand(param.userId, body),
    );
  }

  @SwaggerDecoratorByDeleteUser()
  @Delete(':userId')
  async deleteUser(@Param() param: UserIdDto) {
    return this.commandCommandBus.execute(new DeleteUserCommand(param.userId));
  }
}

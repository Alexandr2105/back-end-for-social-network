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
import { UpdateUserCommand } from './application/useCases/update.user.use-case';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserIdDto } from './dto/user.id.dto';
import { DeleteUserCommand } from './application/useCases/delete.user.use-case';
import { ApiTags } from '@nestjs/swagger';
import {
  SwaggerDecoratorByDeleteUser,
  SwaggerDecoratorByGetAllUsers,
  SwaggerDecoratorByUpdateUser,
} from './swagger/swagger.users.decorators';
import { RefreshCode } from '../auth/validators/get.user.by.refresh.token';
import { GetAllUsersCommand } from './application/useCases/get.All.users.use-case';
import { QueryUserViewModel } from './viewModels/query.user.view.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly commandCommandBus: CommandBus) {}

  @SwaggerDecoratorByGetAllUsers()
  @Get()
  async getAllUsers(
    @Query() query: any,
    @RefreshCode() code: string,
  ): Promise<QueryUserViewModel> {
    return this.commandCommandBus.execute(new GetAllUsersCommand(query, code));
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
  async deleteUser(@Param() param: UserIdDto): Promise<boolean> {
    return this.commandCommandBus.execute(new DeleteUserCommand(param.userId));
  }
}

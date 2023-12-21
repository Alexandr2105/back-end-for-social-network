import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetAllUsersCommand } from './application/useCase/get.All.users.use-case';
import { UserViewModel } from './viewModels/user.view.model';
import { UpdateUserCommand } from './application/useCase/update.user.use-case';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserIdDto } from './dto/user.id.dto';
import { DeleteUserCommand } from './application/useCase/delete.user.use-case';

@Controller('users')
export class UsersController {
  constructor(private readonly commandCommandBus: CommandBus) {}

  @Get()
  async getAllUsers(): Promise<UserViewModel[]> {
    return this.commandCommandBus.execute(new GetAllUsersCommand());
  }

  @Put(':userId')
  async updateUser(
    @Param() param: UserIdDto,
    @Body() body: UpdateUserDto,
  ): Promise<boolean> {
    return this.commandCommandBus.execute(
      new UpdateUserCommand(param.userId, body),
    );
  }

  @Delete(':userId')
  async deleteUser(@Param() param: UserIdDto) {
    return this.commandCommandBus.execute(new DeleteUserCommand(param.userId));
  }
}

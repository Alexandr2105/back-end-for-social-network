import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../users/application/useCases/create.user.use-case';
import { LocalAuthGuard } from '../../common/guards/local.auth.guard';
import { LoginDto } from './dto/login.dto';
import { CreateJwtCommand } from './application/useCases/create.jwt.use-case';
import { GetInformationAboutCommand } from '../users/application/useCases/get.information.about.user.use-case';
import { ApiTags } from '@nestjs/swagger';
import {
  SwaggerDecoratorByGetInformationMe,
  SwaggerDecoratorByLogin,
  SwaggerDecoratorByLogout,
  SwaggerDecoratorByRefreshToken,
  SwaggerDecoratorByRegistration,
} from './swagger/swagger.auth.decorators';
import { RefreshAuthGuard } from '../../common/guards/refresh.auth.guard';
import { UserViewModel } from '../users/viewModels/user.view.model';
import { LogoutCurrentDeviceCommand } from '../devices/useCases/logout.currentDevice.use-case';
import { JwtAuthGuard } from '../../common/guards/jwt.auth.guard';
import { UpdateJwtCommand } from './application/useCases/update.jwt.use-case';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @SwaggerDecoratorByRegistration()
  @HttpCode(204)
  @Post('registration')
  async registration(@Body() body: RegistrationDto): Promise<void> {
    return await this.commandBus.execute(new CreateUserCommand(body));
  }

  @SwaggerDecoratorByLogin()
  @UseGuards(LocalAuthGuard)
  @HttpCode(201)
  @Post('login')
  async loginUser(
    @Req() req: any,
    @Body() body: LoginDto,
    @Res() res: any,
  ): Promise<void> {
    const { accessToken, refreshToken } = await this.commandBus.execute(
      new CreateJwtCommand(req.user.userId, req.ip, req.headers['user-agent']),
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.send(accessToken);
  }

  @SwaggerDecoratorByRefreshToken()
  @UseGuards(RefreshAuthGuard)
  @HttpCode(201)
  @Post('refresh-token')
  async refreshTokenRecovery(@Req() req: any, @Res() res: any) {
    const { accessToken, refreshToken } = await this.commandBus.execute(
      new UpdateJwtCommand(
        req.user.userId,
        req.ip,
        req.headers['user-agent'],
        req.user.deviceId,
      ),
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.send(accessToken);
  }

  @SwaggerDecoratorByGetInformationMe()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('me')
  async getMe(@Req() req: any): Promise<UserViewModel> {
    return this.commandBus.execute(
      new GetInformationAboutCommand(req.user.userId),
    );
  }

  @SwaggerDecoratorByLogout()
  @UseGuards(RefreshAuthGuard)
  @HttpCode(204)
  @Delete('logout')
  async logout(@Req() req: any) {
    await this.commandBus.execute(
      new LogoutCurrentDeviceCommand(
        req.user.userId,
        req.user.deviceId,
        req.user.exp,
      ),
    );
  }
}

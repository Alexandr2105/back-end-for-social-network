import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './application/useCases/create.user.use-case';
import { LocalAuthGuard } from '../../common/guards/local.auth.guard';
import { LoginDto } from './dto/login.dto';
import { CreateJwtCommand } from './application/useCases/create.jwt.use-case';
import { JwtAuthGuard } from '../../common/guards/jwt.auth.guard';
import { GetInformationAboutCommand } from '../users/application/useCase/get.information.about.user.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @HttpCode(204)
  @Post('registration')
  async registration(@Body() body: RegistrationDto): Promise<void> {
    await this.commandBus.execute(new CreateUserCommand(body));
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async loginUser(
    @Req() req: any,
    @Body() body: LoginDto,
    @Res() res: any,
  ): Promise<void> {
    const { accessToken, refreshToken } = await this.commandBus.execute(
      new CreateJwtCommand(req.user.userId),
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: false,
    });
    res.send(accessToken);
  }

  // @UseGuards(RefreshAuthGuard)
  // @HttpCode(200)
  // @Post('refresh-token')
  // async createRefreshToken(@Req() req, @Res() res) {
  //   const token = this.jwtService.creatJWT(req.user.userId);
  //   const refreshToken = this.jwtService.creatRefreshJWT(req.user.userId);
  //   res.cookie('refreshToken', refreshToken, {
  //     httpOnly: false,
  //     secure: false,
  //   });
  //   res.send(token);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: any): Promise<any> {
    return this.commandBus.execute(new GetInformationAboutCommand(req.user.id));
  }
}

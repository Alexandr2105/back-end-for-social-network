import { Injectable } from '@nestjs/common';
import { settings } from '../../common/helper/settings';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ServiceJwt {
  constructor(
    private readonly jwt: JwtService,
    private readonly refreshToken: JwtService,
  ) {}

  creatJWT(userId: number, deviceId: string) {
    return {
      accessToken: this.jwt.sign(
        { userId: userId, deviceId: deviceId },
        { expiresIn: settings.TOKEN_LIFE, secret: settings.JWT_SECRET },
      ),
    };
  }

  creatRefreshJWT(userId: number, deviceId: string) {
    return this.refreshToken.sign(
      {
        userId: userId,
        deviceId: deviceId,
      },
      {
        expiresIn: settings.REFRESH_TOKEN_LIFE,
        secret: settings.REFRESH_TOKEN_SECRET,
      },
    );
  }

  getRefreshTokenInformationByRefreshCode(code: string) {
    try {
      return this.jwt.verify(code, {
        secret: settings.REFRESH_TOKEN_SECRET,
      });
    } catch (e) {
      return false;
    }
  }
}

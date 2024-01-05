import { Injectable } from '@nestjs/common';
import { settings } from '../../common/helper/settings';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ServiceJwt {
  constructor(
    private readonly jwt: JwtService,
    private readonly refreshToken: JwtService,
  ) {}

  creatJWT(userId: string) {
    return {
      accessToken: this.jwt.sign(
        { userId: userId },
        { expiresIn: settings.TOKEN_LIFE, secret: settings.JWT_SECRET },
      ),
    };
  }

  creatRefreshJWT(userId: string) {
    return this.refreshToken.sign(
      {
        userId: userId,
      },
      {
        expiresIn: settings.REFRESH_TOKEN_LIFE,
        secret: settings.REFRESH_TOKEN_SECRET,
      },
    );
  }

  getUserByRefreshCode(code: string): Promise<number> {
    try {
      const data = this.jwt.verify(code, {
        secret: settings.REFRESH_TOKEN_SECRET,
      });
      return data.userId;
    } catch (e) {}
  }
}

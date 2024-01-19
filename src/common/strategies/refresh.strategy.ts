import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { settings } from '../helper/settings';
import { DevicesRepository } from '../../features/devices/devices.repository';

@Injectable()
export class RefreshStrategy extends PassportStrategy(
  Strategy,
  'refreshToken',
) {
  constructor(private readonly devicesRepository: DevicesRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies.refreshToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: settings.REFRESH_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    const info = await this.devicesRepository.getCurrentDeviceByDeviceId(
      payload.deviceId,
    );
    if (info) {
      return { userId: payload.userId, deviceId: payload.deviceId };
    } else {
      throw new UnauthorizedException();
    }
  }
}

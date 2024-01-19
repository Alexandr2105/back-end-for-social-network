import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { settings } from '../helper/settings';
import { DevicesRepository } from '../../features/devices/devices.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly devicesRepository: DevicesRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: settings.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const info = await this.devicesRepository.getCurrentDeviceByDeviceId(
      payload.deviceId,
    );
    if (info) {
      return { id: payload.userId };
    } else {
      throw new UnauthorizedException();
    }
  }
}

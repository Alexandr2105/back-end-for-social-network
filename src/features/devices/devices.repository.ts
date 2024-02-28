import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { RefreshTokenDataEntity } from './entities/refresh.token.data.entity';

@Injectable()
export class DevicesRepository {
  constructor(
    @InjectRepository(RefreshTokenDataEntity)
    private readonly devicesCollection: Repository<RefreshTokenDataEntity>,
  ) {}

  async save(
    deviceInfo: RefreshTokenDataEntity,
  ): Promise<RefreshTokenDataEntity> {
    return this.devicesCollection.save(deviceInfo);
  }

  async deleteCurrentDevice(
    userId: number,
    deviceId: string,
    exp: number,
  ): Promise<void> {
    await this.devicesCollection.delete({
      userId: userId,
      deviceId: deviceId,
      exp: exp,
    });
  }

  async deleteOldDevices(): Promise<void> {
    const timeInSeconds = Math.round(+new Date() / 1000);
    await this.devicesCollection.delete({
      exp: LessThan(timeInSeconds),
    });
  }

  async getCurrentDeviceByDeviceId(deviceId: string) {
    return this.devicesCollection.findOneBy({ deviceId: deviceId });
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';

export class ProfileRepository {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async createOrUpdateProfile(profile: ProfileEntity): Promise<number> {
    const { userId } = await this.profileRepository.save(profile);
    return userId;
  }

  async updateAvatar(userId: number, avatar: any) {
    const result = await this.profileRepository.update(
      { userId: userId },
      { avatar: avatar },
    );
    return result.affected === 1;
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';

export class ProfileRepository {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async createOrUpdateProfile(profile: ProfileEntity): Promise<ProfileEntity> {
    return this.profileRepository.save(profile);
  }
}

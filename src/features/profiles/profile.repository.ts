import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';

export class ProfileRepository {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly usersCollection: Repository<ProfileEntity>,
  ) {}

  async createProfile(profile: ProfileEntity): Promise<ProfileEntity> {
    return this.usersCollection.save(profile);
  }
}

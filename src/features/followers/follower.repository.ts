import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowersEntity } from './entities/followers.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FollowerRepository {
  constructor(
    @InjectRepository(FollowersEntity)
    private readonly followersRepository: Repository<FollowersEntity>,
  ) {}

  async createFollower(data: FollowersEntity): Promise<FollowersEntity> {
    return this.followersRepository.save(data);
  }

  async getFollows(userId: number): Promise<FollowersEntity[]> {
    return await this.followersRepository.find({
      where: { userId: userId },
    });
  }

  async deleteFollower(userId: number, followId: number) {
    return this.followersRepository.delete({
      userId: userId,
      followId: followId,
    });
  }
}

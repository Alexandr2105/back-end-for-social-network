import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entites/users.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersQueryRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersCollection: Repository<UserEntity>,
  ) {}

  getAllUsers() {
    return this.usersCollection.find({
      select: {
        userId: true,
        fullName: true,
        email: true,
        createdAt: true,
        follow: true,
        status: true,
        city: true,
        country: true,
        avatar: true,
      },
    });
  }

  async getUserByEmail(email: any): Promise<UserEntity> {
    return this.usersCollection.findOne({
      where: { email: email },
    });
  }
  async getUserById(userId: number): Promise<any> {
    return this.usersCollection.findOne({
      where: { userId: userId },
      select: { userId: true, fullName: true, createdAt: true, email: true },
    });
  }
}

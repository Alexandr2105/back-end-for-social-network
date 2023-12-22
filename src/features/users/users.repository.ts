import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entites/users.entity';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersCollection: Repository<UserEntity>,
  ) {}

  async createUser(user: UserEntity): Promise<UserEntity> {
    return this.usersCollection.save(user);
  }

  async updateUser(id: number, body: UpdateUserDto): Promise<boolean> {
    await this.usersCollection.update({ id: id }, { ...body });
    return true;
  }

  async deleteUser(id: number): Promise<boolean> {
    await this.usersCollection.delete({ id: id });
    return true;
  }
}

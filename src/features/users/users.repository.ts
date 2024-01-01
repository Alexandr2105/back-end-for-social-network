import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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

  async updateUser(id: number, body: UpdateUserDto): Promise<UpdateResult> {
    return this.usersCollection.update({ id: id }, { ...body });
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return this.usersCollection.delete({ id: id });
  }
}

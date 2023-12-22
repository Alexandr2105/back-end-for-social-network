import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entites/users.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { QueryHelper } from '../../common/helper/query.helper';
import { QueryUserViewModel } from './viewModels/query.user.view.model';

@Injectable()
export class UsersQueryRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersCollection: Repository<UserEntity>,
    private readonly queryHelper: QueryHelper,
  ) {}

  async getAllUsers(queryParam: any): Promise<QueryUserViewModel> {
    const skip = this.queryHelper.skipHelper(
      queryParam.pageNumber,
      queryParam.pageSize,
    );
    const [users, totalCount] = await this.usersCollection.findAndCount({
      select: {
        userId: true,
        fullName: true,
        email: true,
        createdAt: true,
        follow: true,
      },
      order: { [queryParam.sortBy]: queryParam.sortDirection },
      skip: skip,
      take: queryParam.pageSize,
    });
    const pagesCount = this.queryHelper.pagesCountHelper(
      totalCount,
      queryParam.pageSize,
    );
    return {
      pagesCount: pagesCount,
      page: queryParam.pageNumber,
      pageSize: queryParam.pageSize,
      totalCount: totalCount,
      items: users,
    };
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

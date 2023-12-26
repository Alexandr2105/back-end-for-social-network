import { UserTypeForQueryRepo } from '../../../common/types/user.type.for.query.repo';
import { ApiProperty } from '@nestjs/swagger';

export class QueryUserViewModel {
  @ApiProperty({ type: 'number', description: 'Number of items sorted' })
  pagesCount: number;
  @ApiProperty({ type: 'number', description: 'Number of pages' })
  page: number;
  @ApiProperty({ type: 'number', description: 'Page Size' })
  pageSize: number;
  @ApiProperty({ type: 'number', description: 'Total items' })
  totalCount: number;
  @ApiProperty({ type: [UserTypeForQueryRepo] })
  items: UserTypeForQueryRepo[];
}

import { UserViewModel } from './user.view.model';

export class QueryUserViewModel {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: UserViewModel[];
}

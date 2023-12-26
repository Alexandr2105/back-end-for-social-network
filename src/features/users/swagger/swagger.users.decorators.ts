import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  pageNumberQuery,
  pageSizeQuery,
  sortByQuery,
  sortDirectionQuery,
} from '../../../common/types/paging.and.sorting.query.for.swagger.type';
import { QueryUserViewModel } from '../viewModels/query.user.view.model';
import { UserViewModel } from '../viewModels/user.view.model';
import { ApiResponseForSwagger } from '../../../common/helper/api-response-for-swagger';

export function SwaggerDecoratorByGetAllUsers(): MethodDecorator {
  return applyDecorators(
    // ApiBearerAuth(),
    ApiOperation({ summary: 'Get all users' }),
    ApiResponse({ status: HttpStatus.OK, type: QueryUserViewModel }),
    ApiQuery(pageSizeQuery),
    ApiQuery(sortDirectionQuery),
    ApiQuery(sortByQuery),
    ApiQuery(pageNumberQuery),
  );
}

export function SwaggerDecoratorByUpdateUser(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Update current user' }),
    ApiResponse({ status: HttpStatus.OK, type: UserViewModel }),
    ApiResponseForSwagger(HttpStatus.NOT_FOUND, 'Not Found'),
  );
}

export function SwaggerDecoratorByDeleteUser(): MethodDecorator {
  return applyDecorators(
    // ApiBearerAuth(),
    ApiOperation({ summary: 'Delete user' }),
    ApiResponseForSwagger(HttpStatus.NO_CONTENT, 'User deleted'),
    ApiResponseForSwagger(HttpStatus.UNAUTHORIZED, 'Unauthorized'),
    ApiResponseForSwagger(HttpStatus.NOT_FOUND, 'Not Found'),
  );
}

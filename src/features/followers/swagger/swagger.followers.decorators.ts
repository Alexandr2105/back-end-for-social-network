import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiResponseForSwagger } from '../../../common/helper/api-response-for-swagger';
import { FollowersEntity } from '../entities/followers.entity';

export function SwaggerDecoratorByCreateFollower(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create Follower' }),
    ApiResponse({ status: HttpStatus.CREATED, type: FollowersEntity }),
    ApiResponseForSwagger(HttpStatus.NOT_FOUND, 'Not Found'),
    ApiResponseForSwagger(HttpStatus.UNAUTHORIZED, 'Unauthorized'),
    ApiBearerAuth(),
  );
}

export function SwaggerDecoratorByDeleteFollower(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Delete Follower' }),
    ApiResponse({ status: HttpStatus.NO_CONTENT }),
    ApiResponseForSwagger(HttpStatus.NOT_FOUND, 'Not Found'),
    ApiResponseForSwagger(HttpStatus.UNAUTHORIZED, 'Unauthorized'),
    ApiBearerAuth(),
  );
}

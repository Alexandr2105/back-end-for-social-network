import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiResponseForSwagger } from '../../../common/helper/api-response-for-swagger';
import { LoginForSwaggerType } from '../../../common/types/login.for.swagger.type';
import { UserEntity } from '../../users/entites/users.entity';

export function SwaggerDecoratorByRegistration(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Registration' }),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
    }),
    ApiResponseForSwagger(HttpStatus.BAD_REQUEST, 'Bad request'),
  );
}

export function SwaggerDecoratorByLogin(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'User authorization' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      type: LoginForSwaggerType,
    }),
    ApiResponseForSwagger(HttpStatus.UNAUTHORIZED, 'Unauthorized'),
  );
}

export function SwaggerDecoratorByGetInformationMe(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Returns user data' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: UserEntity,
    }),
    ApiResponseForSwagger(HttpStatus.UNAUTHORIZED, 'Unauthorized'),
    ApiBearerAuth(),
  );
}

export function SwaggerDecoratorByRefreshToken(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Update refreshToken' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      type: LoginForSwaggerType,
    }),
    ApiResponseForSwagger(HttpStatus.UNAUTHORIZED, 'Unauthorized'),
  );
}

export function SwaggerDecoratorByLogout(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Logout' }),
    ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' }),
    ApiResponseForSwagger(
      HttpStatus.UNAUTHORIZED,
      'If the JWT refreshToken inside cookie is missing, expired or incorrect',
    ),
  );
}

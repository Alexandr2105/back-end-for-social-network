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

export function SwaggerDecoratorByRefreshLink(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Refresh confirmation link' }),
    ApiResponseForSwagger(HttpStatus.NO_CONTENT, 'Link updated'),
    ApiResponseForSwagger(
      HttpStatus.BAD_REQUEST,
      'List of possible errors:<br>1.Bad request<br>2.Invalid email',
    ),
  );
}

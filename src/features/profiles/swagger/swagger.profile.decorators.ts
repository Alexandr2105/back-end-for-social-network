import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProfileEntity } from '../entities/profile.entity';

export function SwaggerDecoratorByCreateOrUpdateProfile(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Create or update profile' }),
    ApiResponse({ status: HttpStatus.CREATED, type: ProfileEntity }),
  );
}

export function SwaggerDecoratorByGetProfile(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get profile for current user' }),
    ApiResponse({ status: HttpStatus.OK, type: ProfileEntity }),
    ApiBearerAuth(),
  );
}

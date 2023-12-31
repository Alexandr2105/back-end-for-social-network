import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProfileEntity } from '../entities/profile.entity';

export function SwaggerDecoratorByCreateOrUpdateProfile(): MethodDecorator {
  return applyDecorators(
    // ApiBearerAuth(),
    ApiOperation({ summary: 'Create or update profile' }),
    ApiResponse({ status: HttpStatus.OK, type: ProfileEntity }),
  );
}

export function SwaggerDecoratorByGetProfile(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get profile for current user' }),
    ApiResponse({ status: HttpStatus.OK, type: ProfileEntity }),
  );
}

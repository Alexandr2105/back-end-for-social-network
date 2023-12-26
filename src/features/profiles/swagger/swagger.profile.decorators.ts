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

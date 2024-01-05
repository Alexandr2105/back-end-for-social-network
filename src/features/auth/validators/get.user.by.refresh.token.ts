import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RefreshCode = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.cookies.refreshToken;
  },
);

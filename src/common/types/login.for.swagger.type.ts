import { ApiProperty } from '@nestjs/swagger';

export class LoginForSwaggerType {
  @ApiProperty({
    type: 'string',
    description: 'Access token for authentication.',
  })
  accessToken: string;
}

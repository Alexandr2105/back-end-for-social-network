import { ApiProperty } from '@nestjs/swagger';

export class UserViewModel {
  @ApiProperty({ type: 'number', description: 'User id' })
  id: number;
  @ApiProperty({ type: 'string', description: 'Full name' })
  fullName: string;
  @ApiProperty({ type: 'string', description: 'Email' })
  email: string;
  @ApiProperty({ type: 'string', description: 'Created date' })
  createdAt: string;
  @ApiProperty({ type: 'boolean', description: 'Follow or Unfollow' })
  follow: boolean;
}

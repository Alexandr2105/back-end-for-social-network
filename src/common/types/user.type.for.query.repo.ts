import { ApiProperty } from '@nestjs/swagger';
import { UserViewModel } from '../../features/users/viewModels/user.view.model';

class Profile {
  @ApiProperty({ type: 'number', description: 'Profile id' })
  id: number;
  @ApiProperty({ type: 'number', description: 'User id' })
  userId: number;
  @ApiProperty({ type: 'boolean' })
  lookingForAJob: boolean;
  @ApiProperty({ type: 'string' })
  lookingForAJobDescription: string;
  @ApiProperty({ type: 'string' })
  avatar: string;
  @ApiProperty({ type: 'string' })
  country: string;
  @ApiProperty({ type: 'string' })
  city: string;
  @ApiProperty({ type: 'string' })
  status: string;
}

export class UserTypeForQueryRepo extends UserViewModel {
  @ApiProperty({ type: 'boolean', description: 'Follow or Unfollow' })
  follow: boolean;
  @ApiProperty({ type: () => Profile, description: 'User profile' })
  profile: Profile;
}

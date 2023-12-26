import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from '../../profiles/entities/profile.entity';
import { ContactsUserEntity } from '../../profiles/entities/contacts.user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: 'number', description: 'User id' })
  id: number;
  @Column()
  @ApiProperty({ type: 'string', description: 'Full name' })
  fullName: string;
  @Column()
  @ApiProperty({ type: 'string', description: 'Email' })
  email: string;
  @Column()
  password: string;
  @Column()
  @ApiProperty({ type: 'string', description: 'Created date' })
  createdAt: string;
  @Column({ default: false })
  follow: boolean;

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  profile: ProfileEntity;
  @OneToOne(() => ContactsUserEntity, (contactUser) => contactUser.userId)
  contactUser: ContactsUserEntity;
}

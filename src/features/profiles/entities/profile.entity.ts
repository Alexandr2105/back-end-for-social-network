import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entites/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProfileEntity {
  @ApiProperty({ type: 'number', description: 'Profile' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ type: 'number', description: 'User id' })
  @Column()
  userId: number;
  @ApiProperty({ type: 'boolean' })
  @Column({ default: false })
  lookingForAJob: boolean;
  @ApiProperty({ type: 'string' })
  @Column({ default: null })
  lookingForAJobDescription: string;
  @ApiProperty({ type: 'string' })
  @Column({ default: null })
  avatar: string;
  @ApiProperty({ type: 'string' })
  @Column({ default: null })
  country: string;
  @ApiProperty({ type: 'string' })
  @Column({ default: null })
  city: string;
  @ApiProperty({ type: 'string' })
  @Column({ default: null })
  status: string;
  @ApiProperty({ type: 'string' })
  @Column({ default: null })
  aboutMe: string;

  @OneToOne(() => UserEntity, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;
}

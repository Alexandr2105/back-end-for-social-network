import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entites/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class FollowersEntity {
  @ApiProperty({ type: 'number', description: 'Id' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ type: 'number', description: 'Follower id' })
  @Column()
  userId: number;
  @ApiProperty({ type: 'number', description: 'Following id' })
  @Column()
  followId: number;
  @ApiProperty({ type: 'string' })
  @Column()
  createdAt: string;

  @ManyToOne(() => UserEntity, (user) => user.follows, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.follows, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'followId' })
  follow: UserEntity;
}

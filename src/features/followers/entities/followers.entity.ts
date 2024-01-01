import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entites/users.entity';

@Entity()
export class FollowersEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  followId: number;
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

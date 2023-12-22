import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entites/users.entity';

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column({ default: false })
  lookingForAJob: boolean;
  @Column({ default: null })
  lookingForAJobDescription: string;
  @Column()
  avatar: string;
  @Column({ default: null })
  country: string;
  @Column({ default: null })
  city: string;
  @Column({ default: null })
  status: string;

  @OneToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn()
  user: UserEntity;
}

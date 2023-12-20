import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column()
  fullName: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  createdAt: string;
  @Column({ default: null })
  avatar: string;
  @Column({ default: false })
  follow: boolean;
  @Column({ default: null })
  status: string;
  @Column({ default: null })
  country: string;
  @Column({ default: null })
  city: string;
}

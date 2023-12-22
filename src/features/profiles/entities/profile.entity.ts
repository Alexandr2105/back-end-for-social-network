import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  profileId: number;
  @Column()
  userId: number;
  @Column({ default: false })
  lookingForAJob: boolean;
  @Column({ default: null })
  lookingForAJobDescription: string;
  @Column({ default: null })
  avatar: string;
  @Column({ default: null })
  country: string;
  @Column({ default: null })
  city: string;
  @Column({ default: null })
  status: string;
}

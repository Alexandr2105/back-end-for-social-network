import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from '../../profiles/entities/profile.entity';
import { ContactsUserEntity } from '../../profiles/entities/contacts.user.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fullName: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  createdAt: string;
  @Column({ default: false })
  follow: boolean;

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  profile: ProfileEntity;
  @OneToOne(() => ContactsUserEntity, (contactUser) => contactUser.userId)
  contactUser: ContactsUserEntity;
}

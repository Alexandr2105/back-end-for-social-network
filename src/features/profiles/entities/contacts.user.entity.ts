import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ContactsUserEntity {
  @PrimaryColumn()
  userId: string;
  @Column({ default: null })
  github: string;
  @Column({ default: null })
  vk: string;
  @Column({ default: null })
  facebook: string;
  @Column({ default: null })
  instagram: string;
  @Column({ default: null })
  twitter: string;
  @Column({ default: null })
  website: string;
  @Column({ default: null })
  youtube: string;
  @Column({ default: null })
  mainLink: string;
}

import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../../users/entites/users.entity';

@Entity()
export class RefreshTokenDataEntity {
  @PrimaryColumn()
  deviceId: string;
  @Column()
  ip: string;
  @Column()
  deviceName: string;
  @Column()
  userId: number;
  @Column()
  iat: number;
  @Column()
  exp: number;
  @Column()
  dateCreate: Date;

  @ManyToOne(() => UserEntity, (user) => user.devices, { onDelete: 'CASCADE' })
  user: UserEntity;
}

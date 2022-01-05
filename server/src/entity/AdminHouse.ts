import { ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { House } from './House';
import { User } from './User';

@ObjectType()
@Entity()
export class AdminHouse extends BaseEntity {
  @PrimaryColumn('uuid')
  adminId: string;

  @PrimaryColumn('uuid')
  houseId: string;

  @ManyToOne(() => User, user => user.adminHouseConnection, { primary: true })
  @JoinColumn({ name: 'adminId' })
  admin: Promise<User>;

  @ManyToOne(() => House, house => house.adminConnection, { primary: true })
  @JoinColumn({ name: 'houseId' })
  house: Promise<House>;
}

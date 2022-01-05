import { Field } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { House } from './House';
import { User } from './User';

@Entity()
export class UserHouse extends BaseEntity {
  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  houseId: string;

  @ManyToOne(() => User, user => user.userHouseConnection, { primary: true })
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;

  @ManyToOne(() => House, house => house.userConnection, { primary: true })
  @JoinColumn({ name: 'houseId' })
  house: Promise<House>;

  @Field()
  @Column()
  lastAccessed: Date;
}

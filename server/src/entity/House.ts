import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Ctx, Field, ID, ObjectType } from 'type-graphql';
import { Reservation } from './Reservation';
import { UserHouse } from './UserHouse';
import { TypeormLoader } from 'type-graphql-dataloader';
import { AdminHouse } from './AdminHouse';
import { User } from './User';
import { MyContext } from '../MyContext';

@ObjectType()
@Entity()
export class House extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 5, nullable: true })
  zipcode?: string;

  @OneToMany(() => AdminHouse, ah => ah.house)
  adminConnection: Promise<AdminHouse[]>;

  @OneToMany(() => UserHouse, uh => uh.house)
  userConnection: Promise<UserHouse[]>;

  @Field(() => [User])
  async users(@Ctx() { userHousesLoader }: MyContext): Promise<User[]> {
    return userHousesLoader.load(this.id);
  }

  @Field(() => [Reservation])
  @OneToMany(() => Reservation, reservation => reservation.house)
  @TypeormLoader()
  reservations: Reservation[];
}

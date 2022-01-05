import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn
} from 'typeorm';
import { Ctx, Field, ID, ObjectType } from 'type-graphql';
import { Reservation } from './Reservation';
import { UserHouse } from './UserHouse';
import { House } from './House';
import { MyContext } from '../MyContext';
import { TypeormLoader } from 'type-graphql-dataloader';
import { AdminHouse } from './AdminHouse';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: true })
  name?: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  password!: string;

  @Field()
  @Column('bool', { default: false })
  confirmed: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => UserHouse, uh => uh.user)
  userHouseConnection: Promise<UserHouse[]>;

  @Field(() => [House])
  async houses(@Ctx() { housesLoader }: MyContext): Promise<House[]> {
    return housesLoader.load(this.id);
  }

  @OneToMany(() => AdminHouse, ah => ah.admin)
  adminHouseConnection: Promise<AdminHouse[]>;

  @Field(() => [House])
  async adminHouses(@Ctx() { adminHousesLoader }: MyContext): Promise<House[]> {
    return adminHousesLoader.load(this.id);
  }

  @Field(() => [Reservation])
  @OneToMany(() => Reservation, reservation => reservation.author, {
    cascade: true
  })
  @TypeormLoader((reservation: Reservation) => reservation.author)
  reservations: Reservation[];

  @Column('int', { default: 0 })
  tokenVersion: number;
}

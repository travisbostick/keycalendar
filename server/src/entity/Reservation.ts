import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  RelationId,
  CreateDateColumn
  // RelationId
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { House } from './House';
import { User } from './User';

@ObjectType()
@Entity()
export class Reservation extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column({ type: 'date' })
  start: string;

  @Field()
  @Column({ type: 'date' })
  end: string;

  @Field(() => House)
  @ManyToOne(() => House, house => house.reservations)
  house: House;
  @RelationId((reservation: Reservation) => reservation.house)
  houseId: string;

  @Field(() => User)
  @ManyToOne(() => User, author => author.reservations)
  author: User;
  @RelationId((reservation: Reservation) => reservation.author)
  authorId: string;
}

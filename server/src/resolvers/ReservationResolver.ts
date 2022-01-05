import { isAuth } from '../isAuth';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import { Reservation } from '../entity/Reservation';
import { User } from '../entity/User';
import { House } from '../entity/House';
import { MyContext } from '../MyContext';
import { AdminHouse } from '../entity/AdminHouse';

@InputType()
class ReservationInput {
  @Field()
  title: string;

  @Field()
  start: string;

  @Field()
  end: string;
}

@InputType()
class ReservationUpdateInput {
  @Field()
  title: string;

  @Field()
  start: string;

  @Field()
  end: string;
}

@Resolver()
export class ReservationResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createReservation(
    @Arg('houseId') houseId: string,
    @Arg('input', () => ReservationInput) input: ReservationInput,
    @Ctx() { payload }: MyContext
  ) {
    if (payload && payload.userId) {
      const user = await User.findOne(payload.userId);
      const house = await House.findOne(houseId);
      await Reservation.insert({
        ...input,
        author: user,
        house: house
      });
      return true;
    } else {
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateReservation(
    @Arg('id') id: string,
    @Arg('input', () => ReservationUpdateInput) input: ReservationUpdateInput
  ) {
    await Reservation.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteReservation(
    @Arg('id') id: string,
    @Ctx() { payload }: MyContext
  ) {
    const reservation = await Reservation.findOne(id);
    if (!reservation) {
      console.log('could not find reservation');
      return new Error('could not find reservation');
    }
    if (!payload) {
      console.log('could not find user');
      return new Error('could not find user');
    }
    const user = await User.findOne(payload.userId);
    if (!user) {
      console.log('could not find user');
      return new Error('could not find user');
    }
    const adminHouses = await AdminHouse.find({ houseId: reservation.houseId });
    let admin = false;
    if (!adminHouses) {
      console.log('house does not have an admin');
      return new Error('house does not have an admin');
    }
    adminHouses.forEach(adminHouse => {
      if (adminHouse.adminId === user.id) {
        admin = true;
      }
    });
    if (admin || user.id === reservation.authorId) {
      await Reservation.delete(id);
      return true;
    }
    console.log('user cannot delete reservation');
    return new Error('user cannot delete reservation');
  }
}

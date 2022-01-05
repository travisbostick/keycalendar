import { House } from '../entity/House';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import { isAuth } from '../isAuth';
import { UserHouse } from '../entity/UserHouse';
import { MyContext } from '../MyContext';
import { AdminHouse } from '../entity/AdminHouse';
import { Reservation } from '../entity/Reservation';
import { createInviteUrl } from '../utils/createInviteUrl';
import { sendEmail } from '../utils/sendEmail';
import { User } from '../entity/User';

@InputType()
class CreateHouseInput {
  @Field()
  name: string;
}

@ObjectType()
class HouseDetails {
  @Field()
  house: House;
  @Field(() => [User])
  users: [User];
}

@InputType()
class UpdateHouseAddressInput {
  @Field()
  address: string;
  @Field()
  city: string;
  @Field()
  state: string;
  @Field()
  zipcode: string;
  @Field()
  country: string;
}

@Resolver()
export class HouseResolver {
  @Mutation(() => House)
  @UseMiddleware(isAuth)
  async createHouse(
    @Arg('input', () => CreateHouseInput) input: CreateHouseInput,
    @Ctx() { payload }: MyContext
  ) {
    // await House.insert(input);
    if (payload && payload.userId) {
      const house = await House.create(input).save();
      await AdminHouse.insert({ adminId: payload.userId, houseId: house.id });
      await UserHouse.insert({
        userId: payload.userId,
        houseId: house.id,
        lastAccessed: new Date()
      });
      return house;
    }
    return null;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addAdminHouse(
    @Arg('houseId') houseId: string,
    @Ctx() { payload }: MyContext
  ) {
    if (payload && payload.userId) {
      const adminId = payload.userId;
      await AdminHouse.insert({ adminId, houseId });
      return true;
    } else {
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addUserHouse(
    @Arg('houseId') houseId: string,
    @Ctx() { payload }: MyContext
  ) {
    if (payload && payload.userId) {
      const userId = payload.userId;
      await UserHouse.insert({ userId, houseId, lastAccessed: new Date() });
      return true;
    } else {
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteHouse(
    @Arg('houseId') houseId: string,
    @Ctx() { payload }: MyContext
  ) {
    const house = await House.findOne(houseId);
    if (!house) {
      console.log('could not find house');
      return new Error('could not find house');
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
    let authorized = false;
    const admins = await AdminHouse.find({ houseId: houseId });
    admins.forEach(admin => {
      if (admin.adminId === user.id) {
        authorized = true;
      }
    });
    if (!authorized) {
      console.log('not authorized to delete house');
      return new Error('not authorized to delete house');
    }
    try {
      await Reservation.delete({ house: house });
      await UserHouse.delete({ houseId, userId: payload.userId });
      await AdminHouse.delete({ houseId, adminId: payload.userId });
      await House.delete(houseId);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Query(() => HouseDetails)
  @UseMiddleware(isAuth)
  async house(@Arg('houseId') houseId: string, @Ctx() context: MyContext) {
    let access = false;
    const house = await House.findOne(houseId);
    if (!house) {
      console.log('could not find house');
      return new Error('could not find house');
    }
    if (!context || !context.payload) {
      console.log('could not find context');
      return new Error('could not find context');
    }
    const user = await User.findOne(context.payload.userId);
    if (!user) {
      console.log('could not find user');
      return new Error('could not find user');
    }
    const members = await house?.userConnection;
    if (!members) {
      console.log('house has no members');
      return new Error('house has no members');
    }
    members.forEach(member => {
      if (user.id === member.userId) {
        access = true;
      }
    });
    if (!access) {
      console.log('user does not have access');
      return new Error('user does not have access');
    }
    const users = await house.users(context);
    if (!users) {
      console.log('house has not members');
      return new Error('house has no members');
    }
    return {
      house,
      users
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateHouseAddress(
    @Arg('id') id: string,
    @Arg('input', () => UpdateHouseAddressInput) input: UpdateHouseAddressInput
  ) {
    await House.update(id, input);
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateHouseName(@Arg('id') id: string, @Arg('name') name: string) {
    await House.update(id, { name });
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async inviteUser(
    @Arg('houseId') houseId: string,
    @Arg('email') email: string,
    @Ctx() { payload }: MyContext
  ) {
    console.log('inviting user');
    const house = await House.findOne(houseId);
    if (!house) {
      console.log('could not find house');
      return new Error('could not find house');
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
    let authorized = false;
    const admins = await AdminHouse.find({ houseId });
    admins.forEach(admin => {
      if (!authorized && admin.adminId === payload.userId) {
        authorized = true;
      }
    });
    if (!authorized) {
      console.log('user not admin');
      return new Error('user not admin');
    }
    let newMember = true;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const userHouses = await UserHouse.find({ houseId });
      const members = await User.findByIds(userHouses.map(uh => uh.userId));
      members.forEach(member => {
        if (member.email === email) {
          newMember = false;
        }
      });
    }
    console.log(newMember);
    if (!newMember) {
      console.log('user already a member');
      return new Error('email address belongs to current member');
    }
    const inviteUrl = await createInviteUrl(house.id);
    try {
      await sendEmail(
        email,
        inviteUrl,
        "You've been invited to access a house!",
        'Test invite body'
      );
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async accessHouse(
    @Ctx() { payload }: MyContext,
    @Arg('houseId') houseId: string
  ) {
    if (payload && payload.userId) {
      const user = await User.findOne(payload.userId);
      if (!user) {
        throw new Error('could not find user');
      }
      const userHouse = await UserHouse.findOne({
        houseId,
        userId: payload.userId
      });
      if (userHouse) {
        userHouse.lastAccessed = new Date();
        await userHouse.save();
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

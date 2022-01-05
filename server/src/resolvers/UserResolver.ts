import { compare, hash } from 'bcryptjs';
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
import { User } from '../entity/User';
import 'dotenv';
import { createAccessToken, createRefreshToken } from '../auth';
import { sendRefreshToken } from '../sendRefreshToken';
import { MyContext } from '../MyContext';
import { House } from '../entity/House';
import { isAuth } from '../isAuth';
import { sendEmail } from '../utils/sendEmail';
import { createConfirmationUrl } from '../utils/createConfirmationUrl';
import { createForgotPasswordUrl } from '../utils/createForgotPasswordUrl';
import { verify } from 'jsonwebtoken';

@InputType()
class UpdateUserInput {
  @Field()
  name: string;
  @Field()
  email: string;
}

@ObjectType()
class ReturnUser {
  @Field()
  id: string;
  @Field()
  email: string;
  @Field({ nullable: true })
  name?: string;
}

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => ReturnUser)
  user: ReturnUser;
}

@Resolver()
export class UserResolver {
  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const foundUser = await User.findOne({ where: { email } });
    if (foundUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await hash(password, 12);
    try {
      const user = await User.create({
        email,
        password: hashedPassword
      }).save();
      const confirmationUrl = await createConfirmationUrl(user.id);
      await sendEmail(
        email,
        confirmationUrl,
        'Confirmation Email Subject',
        'Confirmation email body'
      );
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updateUser(
    @Ctx() { payload }: MyContext,
    @Arg('input', () => UpdateUserInput) input: UpdateUserInput
  ) {
    if (!payload || !payload.userId) {
      console.log('not logged in');
      return new Error('not logged in');
    }
    let user = await User.findOne(payload.userId);
    if (!user) {
      console.log('could not find user');
      return new Error('could not find user');
    }
    await User.update(user.id, input);
    user = await User.findOne(user.id);
    return user;
  }

  @Mutation(() => User)
  async setUserName(@Arg('id') id: string, @Arg('name') name: string) {
    await User.update({ id }, { name: name });
    const user = await User.findOne(id);
    return user;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, '');
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('could not find user');
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error('incorrect password');
    }

    if (!user.confirmed) {
      throw new Error('user not confirmed');
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user
    };
  }

  @Query(() => [House])
  @UseMiddleware(isAuth)
  async houses(
    @Ctx() { payload }: MyContext,
    @Ctx() context: MyContext
  ): Promise<House[]> {
    if (payload && payload.userId) {
      const user = await User.findOne(payload.userId);
      if (!user) {
        throw new Error('could not find user');
      }
      const houses = await user.houses(context);
      if (houses) {
        return houses;
      } else {
        return [];
      }
    } else {
      throw new Error('not authorized');
    }
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('user does not exist');
      return new Error('user does not exist');
    }
    const forgotPasswordUrl = await createForgotPasswordUrl(user);
    await sendEmail(
      email,
      forgotPasswordUrl,
      'Forgot Password Email Subject',
      'Forgot password email body'
    );
    return true;
  }

  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg('password') password: string,
    @Arg('token') token: string
  ) {
    let payload: any = null;
    try {
      payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return new Error('could not verify user');
    }
    const user = await User.findOne(payload.userId);
    if (!user) {
      console.log('could not find user');
      return null;
    }
    user.password = await hash(password, 12);
    await user.save();
    return user;
  }
}

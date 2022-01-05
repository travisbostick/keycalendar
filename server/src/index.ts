import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import { createConnection, getConnection } from 'typeorm';
import { ReservationResolver } from './resolvers/ReservationResolver';
import { UserResolver } from './resolvers/UserResolver';
import { HouseResolver } from './resolvers/HouseResolver';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import { User } from './entity/User';
import { sendRefreshToken } from './sendRefreshToken';
import { createAccessToken, createRefreshToken } from './auth';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';
import { House } from './entity/House';
import { UserHouse } from './entity/UserHouse';
import { createHousesLoader } from './utils/housesLoader';
import { createAdminHousesLoader } from './utils/adminHousesLoader';
import { createUserHousesLoader } from './utils/userHousesLoader';

(async () => {
  const app = express();
  const path = '/graphql';

  let whitelist = [
    'https://studio.apollographql.com',
    'http://localhost:3000',
    'http://192.168.1.241:3000'
  ];

  let corsOptions = {
    origin: (origin: any, callback: any) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        // console.log(origin);
        callback(new Error('not allowed by cors'));
      }
    },
    credentials: true
  };

  app.use(cors(corsOptions));

  app.use(cookieParser());

  app.post('/invite/:userId/:token', async (req, res) => {
    let userId = req.params.userId;
    const user = await User.findOne(userId);
    if (!user) {
      console.log('user not found');
      return res.send('error');
    }
    let token = req.params.token;
    let payload: any = null;
    try {
      payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send('error');
    }
    const house = await House.findOne(payload.houseId);
    if (!house) {
      console.log('Could not find house');
      return res.send('error');
    }
    const userHouses = await UserHouse.find({ houseId: payload.houseId });
    let newUser = true;
    userHouses.forEach(userHouse => {
      if (userHouse.userId === user.id) {
        newUser = false;
      }
    });
    if (!newUser) {
      console.log('User already a member');
      return res.send("You're already a member of this house");
    }
    console.log(`adding ${user.name} to ${house.name}`);
    try {
      await UserHouse.insert({ userId: user.id, houseId: house.id });
    } catch (err) {
      console.log(err);
    }
    console.log('successfully added the user to the house');
    return res.send('');
  });

  app.post('/confirmation/:token', async (req, res) => {
    let token = req.params.token;
    let payload: any = null;
    try {
      payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send('error');
    }
    const user = await User.findOne(payload.userId);
    if (!user) {
      console.log('confirmation token did not match user');
      return res.send('error');
    }
    if (user.confirmed) {
      console.log('user already confirmed');
      return res.send();
    }
    try {
      await User.update({ id: payload.userId }, { confirmed: true });
    } catch (err) {
      console.log(err);
      console.log('could not confirm user');
      return res.send('error');
    }
    console.log('confirmed user');
    return res.send({
      ok: true,
      accessToken: createAccessToken(user),
      user: user
    });
  });

  app.get('/forgot-password/:id/:token', async (req, res) => {
    let userId = req.params.id;
    let token = req.params.token;
    const user = await User.findOne(userId);
    if (!user) {
      console.log('could not find user');
      return res.send('could not find user');
    }
    let payload: any;
    try {
      payload = verify(token, user.password);
    } catch (err) {
      console.log(err);
      return res.send('error');
    }
    if (payload.userId !== userId) {
      console.log('error');
      return res.send('error');
    }
    return res.send('');
    // try {
    //   payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    // } catch (err) {
    //   console.log(err);
    //   return res.send('error');
    // }
  });

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      console.log('no token');
      return res.send({ ok: false, accessToken: '' });
    }
    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
      // console.log(payload);
    } catch (err) {
      console.log(err);
      console.log('could not verify token');
      return res.send({ ok: false, accessToken: '' });
    }

    const user = await User.findOne(payload.userId);

    if (!user) {
      console.log('token did not match user');
      return res.send({ ok: false, accessToken: '' });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      console.log('wrong version');
      return res.send({ ok: false, accessToken: '' });
    }

    sendRefreshToken(res, createRefreshToken(user));

    // console.log(user);

    return res.send({
      ok: true,
      accessToken: createAccessToken(user),
      user: user
    });
  });

  const httpServer = http.createServer(app);

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, ReservationResolver, HouseResolver]
      // resolvers: [__dirname + '/resolvers/*.ts']
    }),
    context: ({ req, res }: any) => ({
      req,
      res,
      housesLoader: createHousesLoader(),
      adminHousesLoader: createAdminHousesLoader(),
      userHousesLoader: createUserHousesLoader()
    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection
      }) as any,
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection
      }) as any
    ]
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path, cors: false });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  );
})();

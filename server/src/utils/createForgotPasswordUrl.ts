import jwt from 'jsonwebtoken';
import { User } from '../entity/User';

export const createForgotPasswordUrl = async (user: User) => {
  const token = await jwt.sign(
    {
      userId: user.id
    },
    user.password,
    {
      expiresIn: '1d'
    }
  );
  const url = `http://localhost:3000/change-password/${user.id}/${token}`;
  return url;
};

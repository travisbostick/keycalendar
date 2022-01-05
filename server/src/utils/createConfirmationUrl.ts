import jwt from 'jsonwebtoken';

export const createConfirmationUrl = async (userId: string) => {
  const token = await jwt.sign(
    {
      userId
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: '1d'
    }
  );
  const url = `http://localhost:3000/confirm/${token}`;
  return url;
};

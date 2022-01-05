import jwt from 'jsonwebtoken';

export const createInviteUrl = async (houseId: string) => {
  const token = await jwt.sign(
    {
      houseId
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: '1d'
    }
  );
  const url = `http://localhost:3000/invite/${token}`;
  return url;
};

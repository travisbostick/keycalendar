import { Request, Response } from 'express';
import { createHousesLoader } from './utils/housesLoader';
import { createAdminHousesLoader } from './utils/adminHousesLoader';
import { createUserHousesLoader } from './utils/userHousesLoader';

export interface MyContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
  housesLoader: ReturnType<typeof createHousesLoader>;
  adminHousesLoader: ReturnType<typeof createAdminHousesLoader>;
  userHousesLoader: ReturnType<typeof createUserHousesLoader>;
}

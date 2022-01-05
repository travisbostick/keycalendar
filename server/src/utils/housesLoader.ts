import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { House } from '../entity/House';
import { UserHouse } from '../entity/UserHouse';

const batchHouses = async (userIds: string[]) => {
  const userHouses = await UserHouse.find({
    join: {
      alias: 'userHouse',
      innerJoinAndSelect: {
        house: 'userHouse.house'
      }
    },
    where: {
      userId: In(userIds)
    },
    order: {
      lastAccessed: 'DESC'
    }
  });
  const userIdToHouses: { [key: string]: House[] } = {};

  userHouses.forEach(uh => {
    if (uh.userId in userIdToHouses) {
      userIdToHouses[uh.userId].push((uh as any).__house__);
    } else {
      userIdToHouses[uh.userId] = [(uh as any).__house__];
    }
  });

  return userIds.map(userId => userIdToHouses[userId]);
};

export const createHousesLoader = () => new DataLoader(batchHouses);

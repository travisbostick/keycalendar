import DataLoader from 'dataloader';
import { User } from '../entity/User';
import { UserHouse } from '../entity/UserHouse';
import { In } from 'typeorm';

const batchUserHouses = async (houseIds: string[]) => {
  const userHouses = await UserHouse.find({
    join: {
      alias: 'userHouse',
      innerJoinAndSelect: {
        user: 'userHouse.user'
      }
    },
    where: {
      houseId: In(houseIds)
    }
  });
  const houseIdToUsers: { [key: string]: User[] } = {};

  userHouses.forEach(uh => {
    if (uh.houseId in houseIdToUsers) {
      houseIdToUsers[uh.houseId].push((uh as any).__user__);
    } else {
      houseIdToUsers[uh.houseId] = [(uh as any).__user__];
    }
  });

  return houseIds.map(houseId => houseIdToUsers[houseId]);
};

export const createUserHousesLoader = () => new DataLoader(batchUserHouses);

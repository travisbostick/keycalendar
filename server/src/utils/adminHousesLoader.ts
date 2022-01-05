import DataLoader from 'dataloader';
import { AdminHouse } from '../entity/AdminHouse';
import { In } from 'typeorm';
import { House } from '../entity/House';

const batchAdminHouses = async (adminIds: string[]) => {
  const adminHouses = await AdminHouse.find({
    join: {
      alias: 'userHouse',
      innerJoinAndSelect: {
        house: 'userHouse.house'
      }
    },
    where: {
      adminId: In(adminIds)
    }
  });
  const adminIdToHouses: { [key: string]: House[] } = {};

  adminHouses.forEach(ah => {
    if (ah.adminId in adminIdToHouses) {
      adminIdToHouses[ah.adminId].push((ah as any).__house__);
    } else {
      adminIdToHouses[ah.adminId] = [(ah as any).__house__];
    }
  });

  return adminIds.map(adminId => adminIdToHouses[adminId]);
};

export const createAdminHousesLoader = () => new DataLoader(batchAdminHouses);

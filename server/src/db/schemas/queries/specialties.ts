import { specialties } from 'stubData/stubData';
import { SpecialtiesType } from 'db/schemas/types/index';

export const specialtiesQuery = {
  type: SpecialtiesType,
  args: {},
  async resolve(parent: any) {
    return { specialties };
  }
};

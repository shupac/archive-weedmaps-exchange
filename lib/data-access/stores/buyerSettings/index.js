import { types, getEnv } from 'mobx-state-tree';
import get from 'lodash/get';
import Department, { type DepartmentType } from 'models/department';

export const regionId = '64d05017-4339-4cda-9e57-0da061bf6b00';

const BuyerSettings = types
  .model('BuyerSettings', {
    departmentsData: types.array(Department),
  })
  .views(self => ({
    get departments() {
      return self.departmentsData.map(
        ({ id, name, iconImage, avatarImage }) => ({
          id,
          name,
          iconImageUrl: get(iconImage, 'mediumUrl', ''),
          avatarImageUrl: get(avatarImage, 'mediumUrl', ''),
        }),
      );
    },
  }))
  .actions(self => ({
    async getDepartments() {
      try {
        const results = await getEnv(self).client.fetch(
          `/buyer/regions/${regionId}/departments?include=avatar_image,icon_image`,
        );
        self.setDepartmentsData(results);
      } catch (e) {
        console.log(e);
      }
    },
    setDepartmentsData(departmentsData) {
      self.departmentsData = departmentsData;
    },
  }));

export type BuyerSettingsType = {
  getDepartments: (regionId: string) => void,
  departmentsData: DepartmentType[],
};

export default BuyerSettings;

// @flow
import { types, getEnv } from 'mobx-state-tree';
import Department, { type DepartmentType } from 'models/department';
import logger from 'lib/common/logger';

const SellerSettings = types
  .model('SellerSettings', {
    departments: types.array(Department),
  })
  .actions(self => ({
    async fetchDepartments() {
      try {
        const { data } = await getEnv(self).client.fetch(`/seller/departments`);

        self.setDepartments(data);
      } catch (e) {
        logger.error(e);
      }
    },
    setDepartments(departmentsData) {
      self.departments = departmentsData;
    },
  }));

export type SellerSettingsType = {
  fetchDepartments: () => void,
  departments: DepartmentType[],
};

export default SellerSettings;

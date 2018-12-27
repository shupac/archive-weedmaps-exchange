// @flow
import { types, getEnv } from 'mobx-state-tree';
import Department, { type DepartmentType } from 'models/department';

const SellerSettings = types
  .model('SellerSettings', {
    departments: types.array(Department),
  })
  .actions(self => ({
    // BE endpoint is not ready
    async fetchDepartments() {
      try {
        const { data } = await getEnv(self).client.fetch(`/seller/departments`);

        self.setDepartments(data);
      } catch (e) {
        console.log(e);
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

// @flow
import { types, getEnv } from 'mobx-state-tree';
import Department, { type DepartmentType } from 'models/department';
import Zone, { type ZoneType } from 'models/zone';

const SellerSettings = types
  .model('SellerSettings', {
    departments: types.array(Department),
    zones: types.array(Zone),
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
    async fetchZones() {
      try {
        const { data } = await getEnv(self).client.fetch(`/seller/zones`);

        self.setZones(data);
      } catch (e) {
        console.log(e);
      }
    },
    setDepartments(departmentsData) {
      self.departments = departmentsData;
    },
    setZones(zones) {
      self.zones = zones;
    },
  }));

export type SellerSettingsType = {
  fetchDepartments: () => void,
  fetchZones: () => void,
  departments: DepartmentType[],
  zones: ZoneType[],
};

export default SellerSettings;

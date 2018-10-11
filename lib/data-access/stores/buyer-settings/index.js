import { types, getEnv } from 'mobx-state-tree';
import get from 'lodash/get';
import Department, { type DepartmentType } from 'models/department';
import Location, { type LocationType } from 'lib/data-access/models/location';
import Brand, { type BrandType } from 'models/brand';

export const regionId = '64d05017-4339-4cda-9e57-0da061bf6b00';

const BuyerSettings = types
  .model('BuyerSettings', {
    departmentsData: types.array(Department),
    brands: types.array(Brand),
    locations: types.array(Location),
  })
  .views(self => ({
    get departments() {
      return self.departmentsData.map(
        ({ id, name, iconImage, avatarImage, categories }) => ({
          id,
          name,
          iconImageUrl: get(iconImage, 'mediumUrl', ''),
          avatarImageUrl: get(avatarImage, 'mediumUrl', ''),
          categories,
        }),
      );
    },
    get availabilities() {
      return [
        {
          id: 'inStock',
          name: 'In Stock',
        },
        {
          id: 'outOfStock',
          name: 'Out of Stock',
        },
      ];
    },
    get activeLocation() {
      return self.locations.find(location => location.active === true);
    },
  }))
  .actions(self => ({
    async getDepartments() {
      try {
        const departments = await getEnv(self).client.fetch(
          `/buyer/regions/${regionId}/departments?include=avatar_image,icon_image,categories`,
        );
        self.setDepartmentsData(departments);
      } catch (e) {
        console.log(e);
      }
    },
    async getBrands() {
      try {
        const brands = await getEnv(self).client.fetch(
          `/buyer/regions/${regionId}/brands`,
        );
        self.setBrands(brands);
      } catch (e) {
        console.log(e);
      }
    },
    async getLocations() {
      try {
        const results = await getEnv(self).client.fetch(`/locations`);

        self.setLocations(results);
      } catch (e) {
        console.log(e);
      }
    },
    async updateActiveLocation(locationId) {
      // @TODO Patch location endpoint with active location
      console.log('Patch endpoint with this', locationId, 'location Id');
    },
    setDepartmentsData(departmentsData) {
      self.departmentsData = departmentsData;
    },
    setLocations(locationsData) {
      self.locations = locationsData;
    },
    setBrands(brands) {
      self.brands = brands;
    },
  }));

export type BuyerSettingsType = {
  getDepartments: (regionId: string) => void,
  getBrands: (regionId: string) => void,
  getLocations: () => void,
  departments: DepartmentType[],
  brands: BrandType[],
  locations: LocationType[],
};

export default BuyerSettings;

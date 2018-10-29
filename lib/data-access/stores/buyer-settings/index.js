import { types, getEnv, getParent } from 'mobx-state-tree';
import get from 'lodash/get';
import Department, { type DepartmentType } from 'models/department';
import Location, { type LocationType } from 'lib/data-access/models/location';
import Brand, { type BrandType } from 'models/brand';

const BuyerSettings = types
  .model('BuyerSettings', {
    departmentsData: types.array(Department),
    brands: types.array(Brand),
    locations: types.array(Location),
    activeLocation: types.maybe(types.reference(types.late(() => Location))),
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
  }))
  .actions(self => ({
    afterAttach() {
      self.getLocations();
    },
    async getDepartments() {
      try {
        const { data } = await getEnv(self).client.fetch(
          `/buyer/departments?include=avatar_image,icon_image,categories`,
        );

        self.setDepartmentsData(data);
      } catch (e) {
        console.log(e);
      }
    },
    async getBrands() {
      try {
        const { data } = await getEnv(self).client.fetch(`/buyer/brands`);
        self.setBrands(data);
      } catch (e) {
        console.log(e);
      }
    },
    async getLocations() {
      try {
        const { data } = await getEnv(self).client.fetch(`/locations`);

        self.setLocations(data);
        const activeLocal = data.find(location => location.active === true);
        self.setActiveLocation(activeLocal.id);
      } catch (e) {
        console.log(e);
      }
    },
    updateActiveLocation(locationId) {
      const activeLocal = self.locations.find(
        location => location.id === locationId,
      );
      // Exit if selecting a location that is already active exit
      if (activeLocal.active) return;
      // Here we mutate our observable directly
      self.setActiveLocation(activeLocal);
    },
    async syncActiveLocation(locationId) {
      // Call the user preferences endpoint and patch new active location
      await getParent(self).authStore.patchUserLocation(locationId);
      // Wait for above to resolve and then refresh locations
      self.getLocations();
    },
    setDepartmentsData(departmentsData) {
      self.departmentsData = departmentsData;
    },
    setBrands(brands) {
      self.brands = brands;
    },
    setLocations(locationsData) {
      self.locations = locationsData;
    },
    setActiveLocation(activeLocation) {
      self.activeLocation = activeLocation;
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

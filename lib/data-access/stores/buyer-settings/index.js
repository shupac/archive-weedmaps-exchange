// @flow
import { types, getEnv, getParent } from 'mobx-state-tree';
import get from 'lodash/get';
import Department, { type DepartmentType } from 'models/department';
import Location, { type LocationType } from 'lib/data-access/models/location';
import Brand, { type BrandType } from 'models/brand';
import logger from 'lib/common/logger';

const BuyerSettings = types
  .model('BuyerSettings', {
    departmentsData: types.array(Department),
    departmentsLoading: false,
    brands: types.array(Brand),
    locations: types.array(Location),
    editingLocationId: types.maybeNull(types.string),
    deleteLocationId: types.maybeNull(types.string),
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
    get editingLocation() {
      const editingLocation = self.locations.find(
        l => l.id === self.editingLocationId,
      );

      return editingLocation;
    },
    get locationToDelete() {
      const deleteLocation = self.locations.find(
        location => location.id === self.deleteLocationId,
      );

      return deleteLocation;
    },
    get activeLocation() {
      return self.locations.find(location => location.active === true);
    },
  }))
  .actions(self => ({
    async getDepartments() {
      self.setDepartmentsLoading(true);
      try {
        const { data } = await getEnv(self).client.fetch(
          `/buyer/departments?include=avatar_image,icon_image,categories`,
        );
        self.setDepartmentsData(data);
      } catch (e) {
        logger.error(e);
      } finally {
        self.setDepartmentsLoading(false);
      }
    },
    async getBrands() {
      try {
        const { data } = await getEnv(self).client.fetch(`/buyer/brands`);
        self.setBrands(data);
      } catch (e) {
        logger.error(e);
      }
    },
    async getLocations() {
      try {
        const { data } = await getEnv(self).client.fetch(`/locations`);
        const transformedLocations = data.map(location => ({
          ...location,
          address: {
            ...location.address,
            country: location.address.country.toUpperCase(),
          },
        }));
        self.setLocations(transformedLocations);
      } catch (e) {
        logger.error(e);
      }
    },
    async deleteLocation(locationId) {
      try {
        await getEnv(self).client.delete(`/locations/${locationId}`);

        self.getLocations();
        return true;
      } catch (e) {
        logger.error(e);
        return false;
      }
    },
    setEditingLocationId(locationId) {
      self.editingLocationId = locationId;
    },
    setDeleteLocationId(locationId) {
      self.deleteLocationId = locationId;
    },
    async updateActiveLocation(locationId) {
      const activeLocal = self.locations.find(
        location => location.id === locationId,
      );
      // Exit if selecting a location that is already active exit
      if (activeLocal.active) return;
      // Here we mutate our observable directly
      self.setActiveLocation(locationId);
    },
    async syncActiveLocation(locationId) {
      // Call the user preferences endpoint and patch new active location
      await getParent(self).authStore.patchUserLocation(locationId);
      // Wait for above to resolve and then refresh locations
      self.getLocations();
    },
    async createNewLocation(location) {
      const mappedName = {
        address: 'address',
        contactName: 'contact_name',
        deliveryInstructions: 'delivery_instructions',
        email: 'email',
        licenses: 'licenses',
        name: 'name',
        phoneNumber: 'phone_number',
      };

      const mappedLocation = Object.keys(location).reduce((acc, key) => {
        acc[mappedName[key]] = location[key];
        return acc;
      }, {});

      try {
        const payload = {
          data: {
            attributes: mappedLocation,
          },
        };
        const { data } = await getEnv(self).client.post('/locations', payload);
        await self.getLocations();
        self.updateActiveLocation(data.id);
        return true;
      } catch (e) {
        logger.error(e);
        return false;
      }
    },
    async patchLocation(locationData) {
      const {
        address,
        contactName,
        deliveryInstructions,
        email,
        id,
        licenses,
        name,
        phoneNumber,
      } = locationData;

      const newLicenses = licenses.map(item => ({
        license_type: item.licenseType,
        number: item.number,
      }));

      const payload = {
        data: {
          type: 'location',
          attributes: {
            address,
            contact_name: contactName,
            delivery_instructions: deliveryInstructions,
            email,
            licenses: newLicenses,
            name,
            phone_number: phoneNumber,
          },
        },
      };
      try {
        await getEnv(self).client.patch(`/locations/${id}`, payload);
        self.getLocations();
        return true;
      } catch (e) {
        logger.error(e);
        return false;
      }
    },
    setDepartmentsData(departmentsData) {
      self.departmentsData = departmentsData;
    },
    setBrands(brands) {
      self.brands = brands;
    },
    setLocations(locations) {
      self.locations = locations;
    },
    setActiveLocation(locationId) {
      self.locations = self.locations.map(loc => ({
        ...loc,
        active: loc.id === locationId,
      }));
    },
    setDepartmentsLoading(isLoading) {
      self.departmentsLoading = isLoading;
    },
  }));

export type BuyerSettingsType = {
  getDepartments: () => void,
  getBrands: () => void,
  getLocations: () => void,
  departments: DepartmentType[],
  brands: BrandType[] & { toJSON: () => void },
  locations: LocationType[],
  activeLocation: LocationType,
  setEditingLocationId: (locationId: ?string) => void,
  editingLocationId: string,
  editingLocation: LocationType,
  syncActiveLocation: string => void,
  updateActiveLocation: string => void,
  setDeleteLocationId: string => void,
  locationToDelete: LocationType,
  deleteLocation: string => void,
  patchLocation: ({
    address: string,
    contactName: string,
    deliveryInstructions: string,
    email: string,
    id: string,
    licenses: {
      number: string,
      licenseType: string,
    }[],
    name: string,
    phoneNumber: string,
  }) => Promise<boolean>,
  createNewLocation: ({
    address: string,
    contactName: string,
    deliveryInstructions: string,
    email: string,
    licenses: string,
    name: string,
    phoneNumber: string,
  }) => Promise<boolean>,
};

export default BuyerSettings;

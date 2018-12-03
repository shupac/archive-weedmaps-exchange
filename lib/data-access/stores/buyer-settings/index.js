import { types, getEnv, getParent } from 'mobx-state-tree';
import get from 'lodash/get';
import Department, { type DepartmentType } from 'models/department';
import Location, { type LocationType } from 'lib/data-access/models/location';
import Brand, { type BrandType } from 'models/brand';

const BuyerSettings = types
  .model('BuyerSettings', {
    departmentsData: types.array(Department),
    departmentsLoading: false,
    brands: types.array(Brand),
    locations: types.array(Location),
    activeLocation: types.maybe(types.reference(types.late(() => Location))),
    editingLocationId: types.maybeNull(types.string),
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
    get editingLocation() {
      const editingLocation = self.locations.find(
        l => l.id === self.editingLocationId,
      );

      return editingLocation;
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
        console.log(e);
      } finally {
        self.setDepartmentsLoading(false);
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
        const transformedLocations = data.map(location => ({
          ...location,
          address: {
            ...location.address,
            country: location.address.country.toUpperCase(),
          },
        }));
        self.setLocations(transformedLocations);
        const activeLocal = data.find(location => location.active === true);
        self.setActiveLocation(activeLocal.id);
      } catch (e) {
        console.log(e);
      }
    },
    async deleteLocation(locationId) {
      try {
        await getEnv(self).client.delete(`/locations/${locationId}`);
        self.getLocations();
      } catch (e) {
        console.log(e);
      }
    },
    setEditingLocationId(locationId) {
      self.editingLocationId = locationId;
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
        await getEnv(self).client.post('/locations', payload);
        self.getLocations();
      } catch (e) {
        console.log('error', e);
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
      } catch (e) {
        const notification = {
          title: 'Error Alert',
          body:
            'Your edits were not saved because this location was deleted by another user',
          autoDismiss: 3000,
          status: 'ERROR',
        };
        await getParent(self).uiStore.notifyToast(notification);
        console.log(e);
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
    setActiveLocation(activeLocation) {
      self.activeLocation = activeLocation;
    },
    setDepartmentsLoading(isLoading) {
      self.departmentsLoading = isLoading;
    },
  }));

export type BuyerSettingsType = {
  getDepartments: (regionId: string) => void,
  getBrands: (regionId: string) => void,
  getLocations: () => void,
  departments: DepartmentType[],
  brands: BrandType[],
  locations: LocationType[],
  activeLocation: string,
  setEditingLocationId: (locationId: ?string) => void,
  editingLocationId: string,
  editingLocation: LocationType,
};

export default BuyerSettings;

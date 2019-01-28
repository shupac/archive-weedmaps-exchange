// @flow
import { types, getEnv } from 'mobx-state-tree';
import get from 'lodash/get';
import { WmProfile, User, type UserType } from 'lib/data-access/models/user';
import Organization, { type OrganizationType } from 'models/organization';
import { type LocationValueType } from 'models/location';
import logger from 'lib/common/logger';

const AuthStore = types
  .model('AuthStore', {
    wmProfile: types.optional(WmProfile, {}),
    wmxUser: types.maybeNull(User, {}),
    org: types.maybe(Organization),
    selectedLocation: '',
  })
  .views(self => ({
    get loggedIn() {
      return !!(
        self.wmProfile &&
        (self.wmProfile.slug || self.wmProfile.username)
      );
    },
    get isAuthenticated() {
      return getEnv(self).wmSdk.request.isAuthenticated();
    },
    get user() {
      const { avatar_url: avatarUrl, username } = get(self, 'wmProfile', {});
      const { wmUserId, preferences } = get(self, 'wmxUser', {});
      return {
        avatarUrl,
        wmUserId,
        username,
        userContext: preferences.userContext,
      };
    },
    get orgBrands() {
      const brands = get(self.org, 'brands', []);

      return brands.map(({ id, name }) => ({
        value: id,
        text: name,
      }));
    },
    get activeSellerBrand() {
      const { preferences } = get(self, 'wmxUser', {});
      return self.orgBrands.find(brand => brand.value === preferences.brandId);
    },
    get activeContext() {
      return self.user.userContext;
    },
  }))
  .actions(self => ({
    async fetchUser() {
      try {
        const profile = await getEnv(self).wmSdk.user.me();
        const { data: user } = await getEnv(self).client.fetch(`/users/me`);
        const { data: org } = await getEnv(self).client.fetch(
          `/organizations/${user.organization.id}`,
        );

        const { locations, ...rest } = org;
        self.setWmProfile(profile);
        self.setUser(user);
        self.setOrgs(rest);
      } catch (e) {
        logger.error(e);
      }
    },
    async updateOrganization(organization) {
      try {
        const { id } = organization;

        const mappedName = {
          address: 'address',
          contactName: 'contact_name',
          email: 'email',
          name: 'name',
          phoneNumber: 'phone',
        };

        const mappedLocation = Object.keys(organization).reduce((acc, key) => {
          acc[mappedName[key]] = organization[key];
          return acc;
        }, {});

        const payload = {
          data: {
            type: 'address',
            attributes: mappedLocation,
            id,
          },
        };
        await getEnv(self).client.put(`/organizations/${id}`, payload);
        self.fetchUser();
        // self.getOrganization(id);
      } catch (e) {
        logger.error(e);
      }
    },
    // @TODO: DRY up these put calls to preferences
    async patchUserLocation(locationId) {
      const payload = {
        data: {
          type: 'user_preferences',
          attributes: {
            location_id: locationId,
          },
        },
      };
      try {
        const { data: userData } = await getEnv(self).client.put(
          `/users/me/preferences`,
          payload,
        );
        self.setSelectedLocation(userData.preferences.locationId);
      } catch (e) {
        logger.error(e);
      }
    },
    async setUserContext(context) {
      const payload = {
        data: {
          type: 'user_preferences',
          attributes: {
            user_context: context,
          },
        },
      };
      try {
        const { data: userData } = await getEnv(self).client.put(
          `/users/me/preferences`,
          payload,
        );

        self.setUser(userData);
      } catch (e) {
        logger.error(e);
      }
    },
    async setActiveBrand(brandId) {
      const payload = {
        data: {
          type: 'user_preferences',
          attributes: {
            brand_id: brandId,
          },
        },
      };
      try {
        const { data: userData } = await getEnv(self).client.put(
          `/users/me/preferences`,
          payload,
        );

        self.setUser(userData);
      } catch (e) {
        logger.error(e);
      }
    },
    setWmProfile(user) {
      self.wmProfile = user;
    },
    setUser(user) {
      self.wmxUser = user;
    },
    setOrgs(org) {
      self.org = org;
    },
    setSelectedLocation(locationId) {
      self.selectedLocation = locationId;
    },
  }));

export type AuthStoreType = {
  selectedLocation: string,
  activeContext: 'buyer' | 'seller',
  setUserContext: ('buyer' | 'seller') => void,
  user: UserType,
  fetchUser: () => void,
  wmxUser: UserType,
  org: OrganizationType,
  updateOrganization: LocationValueType => void,
  orgBrands: { value: string, text: string }[],
  activeSellerBrand: { value: string, text: string },
  setActiveBrand: string => void,
};

export default AuthStore;

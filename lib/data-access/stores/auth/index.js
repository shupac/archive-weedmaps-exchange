import { types, getEnv } from 'mobx-state-tree';
import User from '../../models/user';

const AuthStore = types
  .model('AuthStore', {
    isLoading: false,
    user: types.optional(User, {}),
    selectedLocation: '',
  })
  .views(self => ({
    get loggedIn() {
      return !!(self.user && (self.user.slug || self.user.username));
    },
    get isAuthenticated() {
      return getEnv(self).wmSdk.request.isAuthenticated();
    },
  }))
  .actions(self => ({
    async fetchUser() {
      const user = await getEnv(self).wmSdk.user.me();

      self.setUser(user);
    },
    async patchUserLocation(locationId) {
      const payload = {
        data: {
          type: 'user_preferences',
          attributes: {
            location_id: locationId,
            user_context: 'buyer',
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
        console.log(e);
      }
    },
    setUser(user) {
      self.user = user;
    },
    setLoadingStatus(loadingStatus) {
      self.isLoading = loadingStatus;
    },
    setSelectedLocation(locationId) {
      self.selectedLocation = locationId;
    },
  }));

export type AuthStoreType = {
  selectedLocation: string,
};

export default AuthStore;

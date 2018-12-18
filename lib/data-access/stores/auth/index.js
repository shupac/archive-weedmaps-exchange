// @flow
import { types, getEnv } from 'mobx-state-tree';
import get from 'lodash/get';
import { WmProfile, User, type UserType } from 'lib/data-access/models/user';

const AuthStore = types
  .model('AuthStore', {
    wmProfile: types.optional(WmProfile, {}),
    wmxUser: types.maybeNull(User, {}),
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
    get activeContext() {
      return self.user.userContext;
    },
  }))
  .actions(self => ({
    async fetchUser() {
      try {
        const profile = await getEnv(self).wmSdk.user.me();
        const { data: user } = await getEnv(self).client.fetch(`/users/me`);

        self.setWmProfile(profile);
        self.setUser(user);
      } catch (e) {
        console.log(e);
      }
    },
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
        console.log(e);
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
        console.log(e);
      }
    },
    setWmProfile(user) {
      self.wmProfile = user;
    },
    setUser(user) {
      self.wmxUser = user;
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
};

export default AuthStore;

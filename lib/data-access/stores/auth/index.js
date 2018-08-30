import { types, getEnv } from 'mobx-state-tree';
import User from '../../models/user';

const AuthStore = types
  .model('AuthStore', {
    isLoading: false,
    user: types.optional(User, {}),
  })
  .views(self => ({
    get loggedIn() {
      return !!(self.user && (self.user.slug || self.user.username));
    },
    get isAuthenticated() {
      return getEnv(self).wmSdk.user.auth.isAuthenticated();
    },
  }))
  .actions(self => ({
    async fetchUser() {
      const user = await getEnv(self).wmSdk.user.me();
      self.setUser(user);
    },
    setUser(user) {
      self.user = user;
    },
    setLoadingStatus(loadingStatus) {
      self.isLoading = loadingStatus;
    },
  }));

export default AuthStore;

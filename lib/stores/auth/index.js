import { observable, action, computed } from 'mobx';
import get from 'lodash.get';
import Store from '../base';

export default class AuthStore extends Store {
  @observable
  user = null;

  @observable
  loading = false;

  get token() {
    return this.sdk.user.auth.accessToken;
  }

  get isAuthenticated() {
    return this.sdk.user.auth.isAuthenticated();
  }

  @computed
  get userRoles() {
    return get(this.user, 'roles', []);
  }

  @computed
  get isOpsManager() {
    return this.userRoles.includes('ops_manager');
  }

  @computed
  get isSalesManager() {
    return this.userRoles.includes('sales_manager');
  }

  @computed
  get isModerator() {
    return this.userRoles.includes('content_moderator');
  }

  @computed
  get isListingOwner() {
    return get(this.user, 'is_listing_owner', false);
  }

  @computed
  get loggedIn() {
    return !!(this.user && (this.user.slug || this.user.username));
  }

  async getUser() {
    try {
      this.startLoading();
      this.setUser(await this.sdk.user.me());
      this.stopLoading();
      return this.user;
    } catch (error) {
      logger.error(error);
      this.stopLoading();
      throw error;
    }
  }

  @action('startLoading')
  startLoading() {
    this.loading = true;
  }

  @action('stopLoading')
  stopLoading() {
    this.loading = false;
  }

  @action('setUser')
  setUser(user) {
    this.user = user;
  }

  dehydrate() {
    return {
      user: this.user,
      loading: this.loading,
    };
  }
}

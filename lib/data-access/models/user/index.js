import { types } from 'mobx-state-tree';
import get from 'lodash/get';

const User = types
  .model({
    username: '',
    email: '',
    roles: types.array(types.string),
    slug: '',
  })
  .views(self => ({
    get isOpsManager() {
      return self.roles.includes('ops_manager');
    },
    get isSalesManager() {
      return self.roles.includes('sales_manager');
    },
    get isModerator() {
      return self.roles.includes('content_moderator');
    },
    get isListingOwner() {
      return get(self, 'is_listing_owner', false);
    },
  }));

export default User;

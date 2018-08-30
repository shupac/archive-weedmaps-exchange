import { getSnapshot } from 'mobx-state-tree';
import User from './index';

const mockUser = {
  username: 'weedmaps',
  email: 'weedmaps@weedmaps.com',
  roles: ['ops_manager', 'content_moderator', 'sales_manager'],
  slug: 'kushagram',
};
export default mockUser;

describe('User Model', () => {
  it('can create an instance of a model', () => {
    const user = User.create(mockUser);
    expect(getSnapshot(user)).toMatchSnapshot();
  });

  it('can get the proper roles of a user', () => {
    const user = User.create(mockUser);
    expect(user.isOpsManager).toEqual(true);
    expect(user.isSalesManager).toEqual(true);
    expect(user.isModerator).toEqual(true);
    expect(user.isListingOwner).toEqual(false);
  });
});

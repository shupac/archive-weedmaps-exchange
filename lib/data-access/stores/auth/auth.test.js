import { getSnapshot } from 'mobx-state-tree';
import AuthStore from './';
import mockUser from '../../models/user/user.test';

const mockAuthStore = {
  isLoading: false,
  isAuthenticated: false,
};

function setup() {
  return {
    mockSdk: {
      user: {
        roles: [],
        email: '',
        slug: '',
        username: '',
        auth: {
          isAuthenticated: jest.fn().mockReturnValue(true),
        },
        me: jest.fn(),
      },
    },
  };
}

describe('Auth Store', () => {
  it('can create an instance of a model', () => {
    const auth = AuthStore.create(mockAuthStore);
    expect(getSnapshot(auth)).toMatchSnapshot();
  });

  it('actions will update the state of the model', () => {
    const auth = AuthStore.create(mockAuthStore);
    auth.setUser(mockUser);
    auth.setLoadingStatus(true);
    expect(getSnapshot(auth)).toMatchSnapshot();
  });

  it('handles fetchUser', async () => {
    const { mockSdk } = setup();

    mockSdk.user.me.mockReturnValue(
      Promise.resolve({
        is_listing_owner: false,
        email: 'weedmaps@weedmaps.com',
        roles: ['op_manager', 'sales_manager', 'content_moderator'],
        slug: 'kushagram',
        username: 'weedmaps',
      }),
    );
    const auth = AuthStore.create({}, { wmSdk: mockSdk });
    await auth.fetchUser();

    expect(auth.user).toEqual({
      email: 'weedmaps@weedmaps.com',
      roles: ['op_manager', 'sales_manager', 'content_moderator'],
      slug: 'kushagram',
      username: 'weedmaps',
    });
  });

  it('handles getAuthStatus', async () => {
    const { mockSdk } = setup();
    const authStore = AuthStore.create({}, { wmSdk: mockSdk });
    expect(authStore.isAuthenticated).toEqual(true);
    mockSdk.user.auth.isAuthenticated.mockReturnValue(false);
    expect(authStore.isAuthenticated).toEqual(false);
  });

  it('can get is the user is loggedIn', () => {
    const auth = AuthStore.create(mockAuthStore);
    expect(auth.loggedIn).toEqual(false);
    auth.setUser(mockUser);
    expect(auth.loggedIn).toEqual(true);
  });
});

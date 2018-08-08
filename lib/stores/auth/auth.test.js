import AuthStore from './';

function setup() {
  return {
    mockSDK: {
      user: {
        auth: {
          accessToken: 'mock.access.token',
          isAuthenticated: jest.fn().mockReturnValue(true),
        },
        roles: [],
        me: jest.fn(),
      },
    },
  };
}

describe('AuthStore', () => {
  it('should be able to fetch and set a user', async () => {
    const { mockSDK } = setup();

    mockSDK.user.me.mockReturnValue(
      Promise.resolve({
        is_listing_owner: true,
        roles: ['ops_manager', 'sales_manager', 'content_moderator'],
        slug: 'user-slug',
        username: 'UserSlug',
      }),
    );

    const authStore = AuthStore.createStore({}, {}, null, mockSDK);
    await authStore.getUser();

    expect(authStore.loggedIn).toBe(true);
    expect(authStore.isOpsManager).toBe(true);
    expect(authStore.isSalesManager).toBe(true);
    expect(authStore.isModerator).toBe(true);
    expect(authStore.isListingOwner).toBe(true);
    expect(authStore.loading).toBe(false);
    expect(authStore.token).toEqual(mockSDK.user.auth.accessToken);
    expect(authStore.isAuthenticated).toEqual(true);
  });

  it('should be able to handle when an error happens during fetching of user', async () => {
    const { mockSDK } = setup();

    mockSDK.user.me.mockImplementation(() =>
      Promise.reject(new Error('Mock Error')),
    );

    const authStore = AuthStore.createStore({}, {}, null, mockSDK);
    await expect(authStore.getUser()).rejects.toThrow('Mock Error');
  });

  it('should be able to dehydrate the state', () => {
    const authStore = AuthStore.createStore({}, {});
    expect(authStore.dehydrate()).toMatchObject({
      user: null,
      loading: false,
    });
  });
});

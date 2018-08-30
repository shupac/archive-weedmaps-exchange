/* eslint-disable import/first, no-unused-vars */
jest.mock('mobx-react');
import { inject, observer } from 'mobx-react';
import RootStore from 'lib/data-access/stores';
import AuthStore from 'lib/data-access/stores/auth';
import AuthConnector from './index';

describe('AuthConnector', () => {
  beforeEach(() => {
    const redirect = require('lib/common/redirect-unauthenticated-user');
    observer.mockImplementation(PageComponent => PageComponent);
    inject.mockImplementation(stores => PageComponent => PageComponent);
    jest.spyOn(redirect, 'redirectByName').mockReturnValue();
    jest.spyOn(redirect, 'redirectUnauthenticatedUser').mockReturnValue();
  });

  it('behaves like an HOC', () => {
    expect(AuthConnector).toBeAHoc();
  });

  describe('when mounting by Next', () => {
    let mockAuthStore;
    let mockSDK;
    beforeEach(() => {
      mockSDK = {
        user: {
          auth: {
            accessToken: 'mock.access.token',
            isAuthenticated: jest.fn().mockReturnValue(true),
          },
          roles: [],
          me: jest.fn().mockReturnValue({ id: 420 }),
        },
      };
      mockAuthStore = AuthStore.create(
        {
          isLoading: false,
        },
        { wmSdk: mockSDK },
      );
    });

    it('will call getInitialProps on the wrapped component', async () => {
      const component = () => <div>test</div>;
      const store = { authStore: mockAuthStore };
      const props = {};
      component.getInitialProps = jest.fn(() => null);
      const Wrapped = AuthConnector(component);
      await Wrapped.getInitialProps(props, store);
      expect(component.getInitialProps).toBeCalledWith(props, store);
    });

    it('will return the props passed by the wrapped component', async () => {
      const component = () => <div>test</div>;
      const store = { authStore: mockAuthStore };
      const props = {};
      component.getInitialProps = jest.fn(() => ({ someProp: 'test' }));
      const Wrapped = AuthConnector(component);
      const finalProps = await Wrapped.getInitialProps(props, store);
      expect(component.getInitialProps).toBeCalledWith(props, store);
      expect(finalProps).toEqual({ someProp: 'test' });
    });
  });
});

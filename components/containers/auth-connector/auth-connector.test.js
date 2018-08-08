/* eslint-disable import/first, no-unused-vars */
jest.mock('mobx-react');
import { inject, observer } from 'mobx-react';
import AuthStore from 'lib/stores/auth';
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
      mockAuthStore = AuthStore.createStore({}, {}, null, mockSDK);
    });

    it('will call getInitialProps on the wrapped component', async () => {
      const component = () => <div>test</div>;
      const stores = { auth: mockAuthStore };
      const props = {};
      component.getInitialProps = jest.fn(() => null);
      const Wrapped = AuthConnector(component);
      await Wrapped.getInitialProps(props, stores);
      expect(component.getInitialProps).toBeCalledWith(props, stores);
    });

    it('will return the props passed by the wrapped component', async () => {
      const component = () => <div>test</div>;
      const stores = { auth: mockAuthStore };
      const props = {};
      component.getInitialProps = jest.fn(() => ({ someProp: 'test' }));
      const Wrapped = AuthConnector(component);
      const finalProps = await Wrapped.getInitialProps(props, stores);
      expect(component.getInitialProps).toBeCalledWith(props, stores);
      expect(finalProps).toEqual({ someProp: 'test' });
    });

    describe('with a user', () => {
      beforeEach(() => {
        mockAuthStore.user = { name: 'test' };
        jest.spyOn(mockAuthStore, 'getUser');
      });

      it('should not call authStore methods', () => {
        const Wrapped = AuthConnector(() => <div />);
        Wrapped.getInitialProps({}, { auth: mockAuthStore });
        expect(mockAuthStore.getUser).not.toHaveBeenCalled();
      });
    });

    describe('without a user', () => {
      beforeEach(() => {
        jest.spyOn(mockAuthStore, 'getUser');
      });
      it('should try to get a user', async () => {
        const Wrapped = AuthConnector(() => <div />);
        await Wrapped.getInitialProps({}, { auth: mockAuthStore });
        expect(mockAuthStore.getUser).toHaveBeenCalled();
      });
    });
  });
});

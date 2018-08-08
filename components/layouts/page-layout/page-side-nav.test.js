import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import toJSON from 'enzyme-to-json';
import AuthStore from 'lib/stores/auth';
import theme from 'lib/styles/theme';
import { PageSideNav } from './page-side-nav';

describe('The PageSideNav', () => {
  it('should be able to show ops_manager role only sidenav', () => {
    const auth = AuthStore.createStore({
      user: {
        roles: ['ops_manager'],
      },
    });
    const tree = toJSON(
      shallow(
        <ThemeProvider theme={theme}>
          <PageSideNav
            collapse={false}
            flags={{}}
            auth={auth}
            router={{ route: '/deals' }}
          />
        </ThemeProvider>,
      ).dive(),
    );

    expect(tree).toMatchSnapshot();
  });

  it('should be able to show all links sidenav when not taxes route', () => {
    const auth = AuthStore.createStore({
      user: {
        roles: [
          'ops_manager',
          'sales_manager',
          'content_moderator',
          'listing_owner',
        ],
      },
    });
    const tree = toJSON(
      shallow(
        <ThemeProvider theme={theme}>
          <PageSideNav
            collapse={false}
            flags={{}}
            auth={auth}
            router={{ route: '/deals' }}
          />
        </ThemeProvider>,
      ).dive(),
    );

    expect(tree).toMatchSnapshot();
  });

  it('should be able to show all links sidenav, except for feature flagged ones', () => {
    const auth = AuthStore.createStore({
      user: {
        roles: [
          'ops_manager',
          'sales_manager',
          'content_moderator',
          'listing_owner',
        ],
      },
    });
    const tree = toJSON(
      shallow(
        <ThemeProvider theme={theme}>
          <PageSideNav
            collapse={false}
            flags={{
              'admin-nearby-placements-link': false,
            }}
            auth={auth}
            router={{ route: '/deals' }}
          />
        </ThemeProvider>,
      ).dive(),
    );

    expect(tree).toMatchSnapshot();
  });
});

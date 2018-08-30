import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import theme from 'lib/styles/theme';
import SideNavComponent from './page-side-nav';

describe('The SideNavComponent', () => {
  it('should be able to show ops_manager role only sidenav', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <SideNavComponent
          collapse={false}
          flags={{}}
          router={{ route: '/deals' }}
        />
      </ThemeProvider>,
    ).dive();

    expect(tree.exists()).toEqual(true);
  });

  it('should be able to show all links sidenav when not taxes route', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <SideNavComponent
          collapse={false}
          flags={{}}
          router={{ route: '/deals' }}
        />
      </ThemeProvider>,
    ).dive();

    expect(tree.exists()).toEqual(true);
  });

  it('should be able to show all links sidenav, except for feature flagged ones', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <SideNavComponent
          collapse={false}
          flags={{
            'admin-nearby-placements-link': false,
          }}
          router={{ route: '/deals' }}
        />
      </ThemeProvider>,
    ).dive();
    expect(tree.exists()).toEqual(true);
  });
});

// @flow
import { shallow } from 'enzyme';
import { ShowIfRoute } from './';

describe('ShowIfRoute', () => {
  it('should render the children if the route matches', () => {
    const tree = shallow(
      <ShowIfRoute match="/some/path" router={{ asPath: '/some/path' }}>
        <div id="weed" />
      </ShowIfRoute>,
    );

    expect(tree.find('#weed')).toHaveLength(1);
  });

  it('should not render the children if the route does not match', () => {
    const tree = shallow(
      <ShowIfRoute match="/some/other/path" router={{ asPath: '/some/path' }}>
        <div id="weed" />
      </ShowIfRoute>,
    );

    expect(tree.find('#weed')).toHaveLength(0);
  });
});

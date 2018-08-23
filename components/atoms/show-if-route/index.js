// @flow
import { withRouter } from 'next/router'; // eslint-disable-line import/no-duplicates
import typeof NextRouter from 'next/router'; // eslint-disable-line import/no-duplicates
import { Component } from 'react';
import pathToRegexp from 'path-to-regexp';

type ShowIfRouteProps = {
  match: string,
  router: NextRouter,
  children: React.ReactChildren,
};

export class ShowIfRoute extends Component<ShowIfRouteProps> {
  render() {
    const {
      children,
      match,
      router: { asPath },
    } = this.props;
    const re = pathToRegexp(match);
    const isMatch = re.exec(asPath);

    if (!isMatch) return null;
    return children;
  }
}

export default withRouter(ShowIfRoute);

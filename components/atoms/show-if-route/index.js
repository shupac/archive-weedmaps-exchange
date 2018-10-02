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
    const isMatch = () => {
      const pathOnlyNoParams = asPath.split('?')[0];

      if (Array.isArray(match)) {
        return match.some(pathMatch => {
          const re = pathToRegexp(pathMatch);

          return re && re.exec(pathOnlyNoParams);
        });
      }
      const re = pathToRegexp(match);
      if (re && re.exec(pathOnlyNoParams)) return true;

      return false;
    };

    if (!isMatch()) return null;
    return children;
  }
}

export default withRouter(ShowIfRoute);

import React, { Component } from 'react';
import { number } from 'prop-types';
import {
  PageContent,
  PageHead,
  PageLayout,
} from 'components/layouts/page-layout';
import ErrorMessage from 'components/atoms/error-message';
import getFeatureFlags from 'components/containers/page-feature-flags';
import { SIDE_NAV_FEATURE_FLAGS } from 'components/layouts/page-layout/page-side-nav';
import urlConfig from 'lib/common/url-config';
import withStores from 'lib/stores/focused-store-provider';
import AuthStore from 'lib/stores/auth';

export class ErrorPage extends Component {
  static displayName = 'ErrorPage';

  static defaultProps = {
    statusCode: null,
  };

  static propTypes = {
    statusCode: number,
  };

  static async getInitialProps(props) {
    const initialProps = {};
    initialProps.statusCode = props.res ? props.res.statusCode : 200;

    /**
     * Next.js swallows error when thrown within the `getInitialProps` cycle
     * but passes the error down through the props to this error page. From
     * here we can then return it to the result so we can properly report it
     * to Honeybadger.
     */

    if (props.err && props.res) {
      props.res.capturedError = props.err;
    }

    return initialProps;
  }

  render() {
    const { statusCode } = this.props;
    return (
      <PageLayout>
        <PageHead />
        <PageContent>
          <ErrorMessage statusCode={statusCode} />
        </PageContent>
      </PageLayout>
    );
  }
}

const pageStores = {
  auth: { Store: AuthStore },
};
export default getFeatureFlags(
  withStores(ErrorPage, pageStores),
  { baseUrl: urlConfig.featureFlagApiUrl },
  [...SIDE_NAV_FEATURE_FLAGS],
);

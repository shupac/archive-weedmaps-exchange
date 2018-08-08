import React, { Component } from 'react';
import urlConfig from 'lib/common/url-config';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import nock from 'nock';
import getFeatureFlags from './';

class MockPage extends Component {
  static getInitialProps() {}

  render() {
    return <div>Mock Page</div>;
  }
}

describe('getFeatureFlags', () => {
  it('should be able to wrap a page component with a FeatureFlagProvider', () => {
    const WrappedMockPage = getFeatureFlags(
      MockPage,
      {
        baseUrl: urlConfig.featureFlagApiUrl,
      },
      ['test-feature-flag'],
    );

    expect(toJSON(mount(<WrappedMockPage />))).toMatchSnapshot();
  });

  it('should be able to get the initial flags', async () => {
    nock(urlConfig.featureFlagApiUrl)
      .head('/test-feature-flag')
      .reply(204, { status: 204 });

    const WrappedMockPage = getFeatureFlags(
      MockPage,
      {
        baseUrl: urlConfig.featureFlagApiUrl,
      },
      ['test-feature-flag'],
    );

    const props = await WrappedMockPage.getInitialProps({
      isServer: true,
    });

    expect(props).toMatchObject({
      initialFlags: {
        'test-feature-flag': true,
      },
    });
  });
});

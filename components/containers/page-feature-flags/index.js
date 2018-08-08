// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { PuffPuff, FeatureFlagProvider } from '@ghostgroup/puffpuff';
import { envName } from 'config';

interface ProviderProps {
  baseUrl: string;
}

interface Props {
  isServer?: boolean;
  initialFlags: {
    [flagName: string]: boolean,
  };
}

export default function getFeatureFlags(
  PageComponent: ComponentType<any>,
  configProps: ProviderProps,
  slugs: string[],
) {
  class PageWithFeatureFlags extends Component<Props> {
    static async getInitialProps(props: Props) {
      let initialProps = {};
      const { isServer } = props;
      const { baseUrl } = configProps;

      // $FlowFixMe
      if (PageComponent.getInitialProps) {
        initialProps = await PageComponent.getInitialProps(props);
      }

      let featureFlags = {};
      if (envName === 'development') {
        // $FlowFixMe
        featureFlags = require('../../../.feature-flags');
      } else {
        const puff = PuffPuff.createWith(baseUrl, null, isServer);

        await Promise.all(
          slugs.map(slug =>
            puff.isOn(slug).then(isOn => {
              featureFlags[slug] = isOn;
            }),
          ),
        );
      }

      return {
        ...initialProps,
        initialFlags: featureFlags,
      };
    }

    render() {
      const { isServer, initialFlags, ...rest } = this.props;
      const { baseUrl } = configProps;
      return (
        <FeatureFlagProvider
          baseUrl={baseUrl}
          isServer={isServer}
          initialFlags={initialFlags}
        >
          <PageComponent {...rest} />
        </FeatureFlagProvider>
      );
    }
  }

  return PageWithFeatureFlags;
}

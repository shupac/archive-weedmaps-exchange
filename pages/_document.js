import React from 'react';
import { useStaticRendering } from 'mobx-react';
import Document, { Head, Main, NextScript } from 'next/document';
import config from 'config';
import 'lib/styles/global';
import { ServerStyleSheet } from 'styled-components';
import 'lib/common/logger';

export class DealsAdminDocument extends Document {
  static async getInitialProps({ renderPage, req }) {
    const page = renderPage();
    const isServer = !!req;
    if (isServer) {
      useStaticRendering(true);
    }
    // Add locale script
    const { localeDataScript } = req;
    return {
      ...page,
      localeDataScript,
    };
  }

  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleTags();

    return (
      <html lang="en">
        <Head>
          <title>Weedmaps Exchange</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="description" content="Weedmaps Exchange" />
          <script type="text/javascript" src="/static/config.js" />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript,
            }}
          />
          <script
            src="//js.honeybadger.io/v0.5/honeybadger.min.js"
            type="text/javascript"
            data-apikey="3bbdd023"
            data-environment={config.envName}
          />
          <style dangerouslySetInnerHTML={{ __html: styleTags }} />
        </Head>
        <body>
          {main}
          <NextScript />
        </body>
      </html>
    );
  }
}

export default DealsAdminDocument;

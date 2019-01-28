import React from 'react';
import { useStaticRendering } from 'mobx-react';
import Document, { Head, Main, NextScript } from 'next/document';
import config from 'config';
import 'lib/styles/global';
import { ServerStyleSheet } from 'styled-components';

export class DealsAdminDocument extends Document {
  static async getInitialProps({ renderPage, res }) {
    try {
      // set mobx static rendering
      useStaticRendering(true);
      // create SC server style sheet
      const sheet = new ServerStyleSheet();
      const page = renderPage(App => props =>
        sheet.collectStyles(<App {...props} />),
      );
      // Flush Styled Components tags
      const styleTags = sheet.getStyleElement();
      return {
        ...page,
        styleTags,
      };
    } catch (e) {
      // Something bad happened during the gIP cycle,
      // set the status code and attach the error
      res.capturedError = e;
      res.statusCode = 500;
      return {};
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="description" content="Weedmaps Exchange" />
          <script type="text/javascript" src="/static/config.js" />
          <script
            src="//js.honeybadger.io/v0.5/honeybadger.min.js"
            type="text/javascript"
            data-apikey="3bbdd023"
            data-environment={config.envName}
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default DealsAdminDocument;

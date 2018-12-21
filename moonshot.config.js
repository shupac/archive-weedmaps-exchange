import config from 'config';

export default {
  csp: () => {
    const csp = {
      policy: {
        directives: {
          'default-src': ['self', 'strict-dynamic'],
          'script-src': [
            'self',
            'https://*.amplitude.com',
            'unsafe-eval',
            'js.honeybadger.io',
          ],
          'img-src': [
            'self',
            'https://wm-exchange-assets-acceptance.s3.amazonaws.com',
            'https://*.internal-weedmaps.com',
            'https://*.weedmaps.com',
            'data:',
            'blob:',
          ],
          'worker-src': [
            'self',
            '*.weedmaps.com',
            '*.internal-weedmaps.com',
            'blob:',
          ],
          'style-src': ['self', 'data:', 'unsafe-inline', '*.mapbox.com'],
          'font-src': ['self', 'https://cdn.joinhoney.com'],
          'frame-src': ['self'],
          'connect-src': [
            'self',
            'https://*.internal-weedmaps.com',
            'https://*.weedmaps.com',
            'https://internal-weedmaps.com',
            'https://weedmaps.com',
            'wss://*.internal-weedmaps.com',
            'wss://*.weedmaps.com',
            'https://*.mapbox.com',
            'http://localhost:*',
            'ws://localhost:*',
            'api.honeybadger.io',
          ],
          'report-uri': [config.contentPolicyReportUri],
        },
        useScriptNonce: true,
      },
    };

    if (process.env.NODE_ENV !== 'production') {
      csp.policy.directives['script-src'].push('unsafe-inline');
      csp.policy.useScriptNonce = false;
      csp.policy.directives['connect-src'].push('http://localhost:3000/');
      csp.policy.directives['script-src'].push(
        'weedmaps-assets-acceptance.weedmaps.com',
      );
      csp.policy.directives['style-src'].push(
        'weedmaps-assets-acceptance.weedmaps.com',
      );
    }
    return csp;
  },
};

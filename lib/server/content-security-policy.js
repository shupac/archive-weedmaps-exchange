const urlConfig = require('../common/url-config');

module.exports = {
  policy: {
    directives: {
      'default-src': ['self', 'strict-dynamic'],
      'script-src': ['self', 'https://*.amplitude.com', 'unsafe-eval'],
      'img-src': [
        'self',
        '*.weedmaps.com',
        '*.internal-weedmaps.com',
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
      'font-src': ['self'],
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
      ],
      'report-uri': [urlConfig.contentPolicyReportUri],
    },
    useScriptNonce: true,
  },
};

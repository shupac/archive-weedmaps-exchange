require('dotenv').config();
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'development';

module.exports = withBundleAnalyzer({
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
  // Turn off the file system routes cause we use next-routes
  useFileSystemPublicRoutes: false,
  distDir: 'build/.next',
  webpack(webpackConfig) {
    // eslint-disable-next-line no-param-reassign
    webpackConfig.resolve.extensions = [
      '.yml',
      '.yaml',
      '.js',
      '.jsx',
      '.json',
    ];

    if (env !== 'production') {
      // Don't analyze the bundle during deploy builds
      if (!process.env.DEPLOY_ENVIRONMENT) {
        webpackConfig.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsFilename: 'stats.json',
          }),
        );
      }
      webpackConfig.devtool = 'source-map';
      webpackConfig.plugins.forEach(options => {
        if (options.constructor.name === 'UglifyJsPlugin') {
          options.options.sourceMap = true;
        }
      });
    }

    webpackConfig.plugins.push(
      new webpack.EnvironmentPlugin({
        NODE_ENV: env,
        LOG_LEVEL: process.env.LOG_LEVEL || 'DEBUG',
        API_V2_URL:
          process.env.API_V2_URL ||
          'https://api-acceptance.weedmaps.com/api/v2',
        API_URL:
          process.env.API_URL || 'https://platform-acceptance.weedmaps.com/gql',
        CORE_BASE_URL:
          process.env.CORE_BASE_URL || 'https://acceptance.weedmaps.com',
        DOC_URL:
          process.env.DOC_URL ||
          'https://platform-acceptance.weedmaps.com/documents',
      }),
    );

    return webpackConfig;
  },
});

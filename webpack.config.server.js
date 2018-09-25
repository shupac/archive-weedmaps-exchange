const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');
const webpack = require('webpack');

const definePlugin = new webpack.DefinePlugin({
  IS_SERVER: true,
});

module.exports = {
  entry: {
    main: ['server.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    chunkFilename: '[name].[hash].js',
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'flow'],
              plugins: [
                'transform-decorators-legacy',
                'transform-class-properties',
                'transform-object-rest-spread',
                [
                  'module-resolver',
                  {
                    alias: {
                      lib: './lib',
                      routes: './routes',
                      config: './config',
                      models: './lib/data-access/models',
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins:
    process.env.NODE_ENV !== 'production'
      ? [
          definePlugin,
          new WebpackShellPlugin({
            onBuildEnd: [
              'nodemon --signal SIGKILL --watch ./build/ ./build/server.js',
            ],
          }),
        ]
      : [definePlugin],
};

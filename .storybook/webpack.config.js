const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.EnvironmentPlugin(['MAPBOX_ACCESS_TOKEN', 'STORYBOOK'])
  ],
}

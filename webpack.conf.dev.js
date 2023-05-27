const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    hot: true
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin()
  ]
}

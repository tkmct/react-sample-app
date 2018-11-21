const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const AssetsPlugin = require('assets-webpack-plugin')
const WebpackBar = require('webpackbar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const base = require('./base')

// TODO: read from process.env
const PORT = process.env.PORT || 2233
const DEV_SERVER_PORT = PORT + 1

const rootDir = path.resolve('..')
const publicPath = '/static/js/'
const outPublicPath = 'http://localhost:' + DEV_SERVER_PORT + publicPath

module.exports = merge(base, {
  name: 'client',
  target: 'web',
  entry: {
    client: [
      'webpack-dev-server/client?http://localhost:' + DEV_SERVER_PORT,
      'webpack/hot/dev-server?http://localhost:' + DEV_SERVER_PORT,
      './src/client.tsx'
    ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    publicPath: outPublicPath
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new AssetsPlugin({
      path: path.resolve('dist'),
      filename: 'assets.json'
    }),
    new WebpackBar({ name: 'client', color: 'orange' }),
    new FriendlyErrorsWebpackPlugin()
  ],
  devServer: {
    disableHostCheck: true,
    clientLogLevel: 'none',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    host: 'localhost',
    port: PORT + 1,
    publicPath: publicPath,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    },
    hot: true,
    overlay: true
  }
})

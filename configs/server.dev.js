const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const WebpackBar = require('webpackbar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const base = require('./base')

// TODO: read from process.env
const PORT = process.env.PORT || 2233

module.exports = merge(base, {
  name: 'server',
  target: 'node',
  entry: {
    server: ['./src/index.ts']
  },
  output: {
    library: 'server',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new WebpackBar({ name: 'server', color: 'blue' }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          'Server is running on PORT: ' + PORT,
          'Enter `rs` to restart server.'
        ]
      }
    }),
    new StartServerPlugin({
      name: 'server.js',
      keyboard: true // TODO: disable for production build
    })
  ],
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?300']
    })
  ]
})

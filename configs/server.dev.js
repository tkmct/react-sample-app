const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const WebpackBar = require('webpackbar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
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
    new FriendlyErrorsWebpackPlugin({ clearConsole: false })
  ],
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?300']
    })
  ]
})

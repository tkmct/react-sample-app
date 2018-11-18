const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const base = require('./base')

module.exports = merge(base, {
  name: 'server',
  target: 'node',
  entry: { server: './src/index.ts' },
  output: {
    library: 'server',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  externals: [nodeExternals()]
})

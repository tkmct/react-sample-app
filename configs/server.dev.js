const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const base = require('./base')

module.exports = merge(base, {
  name: 'server',
  target: 'node',
  entry: { server: './src/server/server.tsx' },
  output: {
    library: 'server',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()]
})

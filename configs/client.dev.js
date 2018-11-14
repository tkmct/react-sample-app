const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const base = require('./base')

const rootDir = path.resolve('..')

module.exports = merge(base, {
  name: 'client',
  target: 'web',
  entry: {
    client: [
      './src/client/index.tsx',
      'webpack-hot-middleware/client?quiet=true'
    ],
    serviceWorker: ['./src/client/serviceWorker.ts']
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})

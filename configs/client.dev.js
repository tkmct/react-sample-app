const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const base = require('./base')

const rootDir = path.resolve('..')

module.exports = merge(base, {
  name: 'client',
  target: 'web',
  entry: {
    client: ['./src/client/index.tsx']
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve('dist/public/static/js'),
    publicPath: '/static/js/'
  }
})

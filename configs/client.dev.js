const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const base = require('./base')

const PORT = process.env.PORT || 2233

const rootDir = path.resolve('..')
const publicPath = '/static/js/'
const outPublicPath = 'http://localhost:' + (PORT + 1) + publicPath

module.exports = merge(base, {
  name: 'client',
  target: 'web',
  entry: {
    client: [
      'webpack-dev-server/client?http://localhost:2234/',
      './src/client.tsx'
    ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    publicPath: outPublicPath
  },
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
    }
  }
})

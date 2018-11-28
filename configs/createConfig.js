const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const AssetsPlugin = require('assets-webpack-plugin')
const WebpackBar = require('webpackbar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = (target = 'web', env = 'development', { port = 2233 }) => {
  // shared config for initialization
  let config = {
    mode: env,
    target,
    output: {
      filename: '[name].js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve('dist')
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    }
  }

  // client config
  if (target === 'web') {
    const devServerPort = port + 1

    const rootDir = path.resolve('..')
    const publicPath = '/static/js/'
    const outPublicPath = 'http://localhost:' + devServerPort + publicPath

    config = merge(config, {
      name: 'client',
      entry: {
        client: [
          'webpack-dev-server/client?http://localhost:' + devServerPort,
          'webpack/hot/dev-server?http://localhost:' + devServerPort,
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
        new FriendlyErrorsWebpackPlugin({ clearConsole: false })
      ],
      devServer: {
        disableHostCheck: true,
        clientLogLevel: 'none',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        host: 'localhost',
        port: devServerPort,
        publicPath: publicPath,
        quiet: true,
        watchOptions: {
          ignored: /node_modules/
        },
        hot: true,
        overlay: true
      }
    })
  }

  // server config
  if (target === 'node') {
    config = merge(config, {
      name: 'server',
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
  }

  return config
}

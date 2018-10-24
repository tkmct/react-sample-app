const path = require('path')

const isProd = process.env.NODE_ENV === 'production'
const mode = isProd ? 'production' : 'development'

module.exports = {
  mode,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve('dist'),
    publicPath: '/public/'
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

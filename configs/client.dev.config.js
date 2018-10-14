const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');

let pathsToClean = [
  'dist',
]

let cleanOptions = {
  exclude: ['server.js'],
  verbose: true,
  dry: false
}

module.exports = {
  mode: "development",
  entry: {
    client: "./src/client.tsx"
  },
  output: {
    filename: "client.js",
    path: path.resolve(__dirname, '..', "dist")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  plugins: [new CleanWebpackPlugin(pathsToClean, cleanOptions)],
};

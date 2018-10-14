const webpack = require('webpack')
const merge = require("webpack-merge");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

const base = {
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: path.resolve(__dirname, "dist")
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
  }
};

const serverConfig = merge(base, {
  name: 'server',
  target: "node",
  entry: { server: "./src/server/server.tsx" },
  output: {
    library: 'server',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()]
});

const clientConfig = merge(base, {
  name: 'client',
  target: "web",
  entry: { client: ["./src/client/index.tsx", 'webpack-hot-middleware/client'] },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});

module.exports = [serverConfig, clientConfig];

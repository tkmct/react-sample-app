const path = require("path");
const externals = require("webpack-node-externals");

const serverConfig = {
  mode: "development",
  target: "node",
  entry: {
    server: "./src/server.ts"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
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
    extensions: [".tsx", ".ts", ".jsx", "js"]
  },
  externals: [externals()]
};

const clientConfig = {
  mode: "development",
  entry: {
    server: "./src/client.ts"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
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
    extensions: [".tsx", ".ts", ".jsx", "js"]
  }
};

module.exports = [serverConfig, clientConfig];

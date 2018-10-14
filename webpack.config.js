const merge = require("webpack-merge");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

const base = {
  mode: "development",
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
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  }
};

const serverConfig = merge(base, {
  target: "node",
  entry: { server: "./src/server/server.tsx" },
  externals: [nodeExternals()]
});

const clientConfig = merge(base, {
  target: "web",
  entry: { client: "./src/client/index.tsx" }
});

module.exports = [serverConfig, clientConfig];

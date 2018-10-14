const path = require("path");
const externals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  target: "node",
  entry: {
    server: "./src/server.tsx"
  },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "..", "dist")
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
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
  externals: [externals()]
};

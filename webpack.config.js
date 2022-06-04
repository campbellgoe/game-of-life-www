const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./wasm-dynamic-import.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "wasm-dynamic-import.js",
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin(['index.html'])
  ],
};

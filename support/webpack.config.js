const { BannerPlugin } = require("webpack");
const version = require("../package.json").version;

const banner = `Clayhead v${version}
(c) ${new Date().getFullYear()} Bo Powers
Released under the MIT License.`;

module.exports = {
  entry: "./build/esm/index.js",
  output: {
    filename: "clayhead.js",
    library: "clayhead",
    libraryTarget: "umd",
    globalObject: "self",
  },
  mode: "development",
  devtool: "source-map",
  node: false,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-object-assign"],
          },
        },
      },
    ],
  },
  plugins: [new BannerPlugin(banner)],
};
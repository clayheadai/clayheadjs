const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { babel } = require("@rollup/plugin-babel");
const { terser } = require("rollup-plugin-terser");

const version = require("../package.json").version;
const banner = `/*!
 * Clayhead v${version}
 * (c) ${new Date().getFullYear()} Bo Powers
 * Released under the MIT License.
 */`;

module.exports = {
  input: "./build/esm/browser-entrypoint.js",
  output: [
    {
      file: "./dist/clayhead.js",
      format: "umd",
      name: "clayhead",
      sourcemap: true,
      banner,
    },
    {
      file: "./dist/clayhead.min.js",
      format: "umd",
      name: "clayhead",
      sourcemap: true,
      plugins: [terser()],
      banner,
    },
  ],
  plugins: [
    nodeResolve({
      browser: true,
    }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      presets: [["@babel/env"]],
      plugins: ["@babel/plugin-transform-object-assign"],
    }),
  ],
};

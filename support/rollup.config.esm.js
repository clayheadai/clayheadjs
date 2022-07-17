const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { terser } = require("rollup-plugin-terser");

const version = require("../package.json").version;
const banner = `/*!
 * Clayhead v${version}
 * (c) ${new Date().getFullYear()} Bo Powers
 * Released under the MIT License.
 */`;

module.exports = {
  input: "./build/esm/index.js",
  output: {
    file: "./dist/clayhead.esm.min.js",
    format: "esm",
    sourcemap: true,
    plugins: [terser()],
    banner,
  },
  plugins: [
    nodeResolve({
      browser: true,
    }),
    commonjs(),
  ],
};

const base = require("./rollup.config.umd.js");

module.exports = {
  ...base,
  output: {
    ...base.output[1],
    file: "./dist/clayhead.msgpack.min.js",
  },
  plugins: [...base.plugins],
};

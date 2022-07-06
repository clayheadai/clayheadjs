const config = require("./prod.config");

module.exports = {
  ...config,
  output: {
    ...config.output,
    filename: "clayhead.msgpack.min.js",
  },
  plugins: [
    ...config.plugins,
  ],
};
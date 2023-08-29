/* craco.config.js */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@service': path.resolve(__dirname, 'src/service'),
      '@domain': path.resolve(__dirname, 'src/domain'),
    },
  },
};

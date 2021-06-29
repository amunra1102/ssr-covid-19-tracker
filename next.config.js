const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([optimizedImages], {
  target: 'serverless',
  reactStrictMode: true,
  optimizeImages: false,
  env: {
    SERVER_API_PATH: 'https://covid19.mathdro.id/api'
  }
});

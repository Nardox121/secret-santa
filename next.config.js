/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config) {
    config.infrastructureLogging = { debug: /PackFileCache/ }
    return config;
  }
}

// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'my-app',
      // URL to the GraphQL API
      url: 'http://81.200.156.6:8080/v1/graphql',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
};
// apollo.config.js
module.exports = {
  client: {
    service: {
      name: "viraas",
      // URL to the GraphQL API
      // url: "http://localhost:3000/graphql",
      url: "https://victorgomez09-curly-invention-j4wxj4p5xpxfqxgq-3000.preview.app.github.dev/graphql",
      headers: {
        authorization: "Bearer password",
      },
      skipSSLValidation: true,
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};

// apollo.config.js
module.exports = {
  client: {
    service: {
      name: "viraas",
      // URL to the GraphQL API
      // url: "http://localhost:3000/graphql",
      url: "https://3000-victorgomez09-viraas-hg9y4ihg0jj.ws-eu83.gitpod.io/graphql",
      headers: {
        authorization: "Bearer password",
      },
      skipSSLValidation: true,
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};

const handler = require("./handler");

async function login(server, options) {
  server.route({
    method: "GET",
    url: "brand/sign-in",
    // schema: {
    //   tags: ["Login"],security: [
    //     {
    //       "apiKey": []
    //     }
    //   ]
    // },
    handler: async function (req, res) {
      return await handler.loginValidation(server, req, res);
    },
  });
}

module.exports = login;

const handler = require("./handler");
const schema = require("./schema");

async function login(server, options) {
  server.route({
    method: "POST",
    url: "/brand/sign-up",
    schema: schema.brandRegistrationSchema,
    handler: async function (req, res) {
      return await handler.brandSignUpValidation(server, req, res);
    },
    schemaErrorFormatter: (errors) => {
      return new Error(errors[0].message);
    },
  });
}

module.exports = login;

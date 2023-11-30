const schema = require("./schema");
const handler = require("./handler");

async function company(server) {

  server.route({
    method: "POST",
    url: "/post-company-total-details",
    // schema: schema.getSchema.schema,
    // preHandler: server.authenticate,
    handler: async function (req, reply) {
      return await handler.enterCompanyDetails(server, req, reply);
    },
    // schemaErrorFormatter: (errors) => {
    //   return new Error(errors[0].message);
    // },
  });

  server.route({
    method: "GET",
    url: "/company-details",
    // schema: schema.getSchema.schema,
    // preHandler: server.authenticate,
    handler: async function (req, reply) {
      return await handler.getCompanyDetails(server, req, reply);
    },
    // schemaErrorFormatter: (errors) => {
    //   return new Error(errors[0].message);
    // },
  });

}

module.exports = company;

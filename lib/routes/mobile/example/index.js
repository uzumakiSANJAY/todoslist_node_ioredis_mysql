const schema = require("./schema");
const handler = require("./handler");

// const app = fastify();
// const Ajv = require("ajv");
// const AjvErrors = require("ajv-errors");
// const ajv = new Ajv({ allErrors: true });
// AjvErrors(ajv);

async function setup(server) {
  server.route({
    method: "GET",
    url: "/getapi",
    schema: schema.getSchema.schema,
    // preHandler: server.authenticate,
    handler: async function (req, reply) {
      return await handler.example(server, req, reply);
    },
  });

  server.route({
    method: "POST",
    url: "/postapi",
    schema: schema.postSchema.schema,
    // preHandler: server.authenticate,
    handler: async function (req, reply) {
      try {
        reply.statusCode = 500;
        return server.requestResponse.error({
          message: "Something Went Wrong !!!!!",
        });
      } catch {
        reply.statusCode = 500;
        return server.requestResponse.error({
          message: "Something Went Wrong !!!!!",
        });
      }
    },
    schemaErrorFormatter: (errors) => {
      return new Error(errors[0].message);
    },
  });

  server.route({
    method: "PUT",
    url: "/putapi/:id",
    schema: schema.putSchema.schema,
    // preHandler: server.authenticate,
    handler: async function (req, reply) {
      try {
        return await server.requestResponse.success({
          message: "Request Successfull",
        });
      } catch {
        reply.statusCode = 500;
        return server.requestResponse.error({
          message: "Something Went Wrong !!!!!",
        });
      }
    },
  });
}

module.exports = setup;

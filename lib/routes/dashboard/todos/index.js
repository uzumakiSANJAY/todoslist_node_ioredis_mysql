const schema = require("./schema");
const handler = require("./handler");

async function setup(server) {
  server.route({
    method: "GET",
    url: "/getapi",
    // schema: schema.getSchema.schema,
    // preHandler: server.authenticate,
    handler: async function (req, reply) {
      return await handler.getTodo(server, req, reply);
    },
    // schemaErrorFormatter: (errors) => {
    //   return new Error(errors[0].message);
    // },
  });

  server.route({
    method: "POST",
    url: "/postapi",
    // schema: schema.postSchema.schema,
    // preHandler: server.authenticate,
    handler: async function (req, reply) {
      return await handler.postTodo(server, req, reply);
    },
    // schemaErrorFormatter: (errors) => {
    //   return new Error(errors[0].message);
    // },
  });

  server.route({
    method: "PUT",
    url: "/putapi",
    // schema: schema.putSchema.schema,
    // preHandler: server.authenticate,
    handler: async function (req, reply) {
      return await handler.updateTodo(server, req, reply);
    },
    // schemaErrorFormatter: (errors) => {
    //   return new Error(errors[0].message);
    // },
  });
}

module.exports = setup;

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  await fastify.register(require("@fastify/swagger"), {
    mode: "dynamic",
    openapi: {
      info: {
        title: "Swagger",
        description: "Swagger API Documentaion",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://${fastify.config.env.API_HOST}:${fastify.config.env.API_PORT}`,
          description: "Development Server",
        },
      ],
      tags: [
        {
          name: "Under development",
          description: "API under development not to be integrated",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            name: "Authorization",
            scheme: "bearer",
            in: "header",
            description: "Bearer Token",
            bearerFormat: "JWT",
          },
          basicAuth: {
            type: "http",
            name: "Authorization",
            scheme: "basic",
            in: "header",
          },
          apiKey: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
          },
        },
      },
    },
  });

  await fastify.register(require("@fastify/swagger-ui"), {
    routePrefix: "/documentation",
  });
});

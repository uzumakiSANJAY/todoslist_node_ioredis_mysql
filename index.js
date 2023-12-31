const configuration = require("./lib/config/fastify");
const startServer = require("./lib/plugins/server");
const fastifyRedis = require("@fastify/redis");

const start = async () => {
  // fastify configuration
  const config = configuration.fastifyConfig;

  // env configuration
  const envConfig = configuration.env;

  // require fastify
  const server = require("fastify")(config.fastifyInit);

  server.register(require("@fastify/cors"), {
    // put your options here
  });

  // Register the fastify-redis plugin with your Fastify server
  server.register(fastifyRedis, {
    host: "localhost", // Redis host
    port: 6379, // Redis port
    // Any other Redis options you want to set
  });

  // reply if API not exists
  server.get("*", async (request, reply) => {
    reply.statusCode = 404;
    reply.send(
      server.requestResponse.error({
        code: reply.statusCode,
        message: "API not Found",
      })
    );
  });

  // register all plugings, decorators
  await server.register(startServer, {
    fastifyConfig: config,
    envConfig: envConfig,
  });

  // register jwt for authentication
  server.register(require("@fastify/jwt"), {
    secret: server.config.env.JWT_SECRET,
  });

  // listen to the port
  await server.listen(config.fastify);
};

start();

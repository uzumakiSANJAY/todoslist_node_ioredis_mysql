const envSchema = require("env-schema");
const S = require("fluent-json-schema");

// env configuration
const env = envSchema({
  dotenv: true,
  schema: S.object()
    .prop("API_PORT", S.number().default(5000).required())
    .prop("ENABLE_REQUEST_LOGGING", S.boolean().default(false).required())
    .prop("IS_PRODUCTION", S.boolean().default(false).required())
    .prop(
      "LOG_LEVEL",
      S.string()
        .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
        .default("info")
        .required()
    )
    .prop("API_HOST", S.string().default("127.0.0.1").required())
    .prop(
      "NODE_ENV",
      S.string()
        .enum(["development", "production"])
        .default("development")
        .required()
    )
    .prop("DATABASE_CONNECTION_LIMIT", S.number().default(1000).required())
    .prop("DATABASE_HOST", S.string().required())
    .prop("DATABASE_PORT", S.string().required())
    .prop("DATABASE_USER", S.string().required())
    .prop("DATABASE_PASSWORD", S.string().required())
    .prop("DATABASE_NAME", S.string().required())
    .prop("JWT_SECRET", S.string().required()),
});

// fastify configuration
const fastifyConfig = {
  IS_PRODUCTION: env.IS_PRODUCTION,
  fastify: {
    host: "0.0.0.0",
    port: env.API_PORT,
  },

  fastifyInit: {
    enableRequestLogging: env.ENABLE_REQUEST_LOGGING,
    disableRequestLogging: true,
    connectionTimeout: 300000,
    logger: {
      level: env.LOG_LEVEL,
    },
    ajv: {
      customOptions: {
        // jsonPointers: true,
        // Warning: Enabling this option may lead to this security issue https://www.cvedetails.com/cve/CVE-2020-8192/
        allErrors: true,
      },
      plugins: [require("ajv-errors")],
    },
  },
};

module.exports = { fastifyConfig, env };

const fp = require("fastify-plugin");
const autoLoad = require("@fastify/autoload");
const { join } = require("path");
const jwt = require("./authentication/index");
const database = require("./database/index");
const swagger = require("./swagger");
const SQL = require("@nearform/sql");

async function plugin(server, config) {
  // swagger initialize only if IS_PRODUCTION = false
  if (!config.fastifyConfig.IS_PRODUCTION) server.register(swagger);

  // on request log
  server.addHook("onRequest", async (req) => {
    if (config.fastifyConfig.fastifyInit.enableRequestLogging) {
      req.log.info({ req }, "incoming request");
    }
  });

  // on response log
  server.addHook("onResponse", async (req, res) => {
    if (config.fastifyConfig.fastifyInit.enableRequestLogging) {
      req.log.info({ req, res }, "request completed");
    }
  });

  server.setErrorHandler(function (error, request, reply) {
    if (error.statusCode) {
      reply.status(error.statusCode).send({
        status: false,
        code: error.statusCode,
        message: error.message,
      });
    } else {
      console.error(error);
      reply.status(500).send({
        status: false,
        code: 500,
        message: "Internal Server Error",
      });
    }
  });

  // default response structure
  server.decorate("requestResponse", {
    success: (data) => {
      return {
        status: data.status
          ? typeof data.status === "boolean"
            ? data.status
            : true
          : true,
        code: data.code
          ? typeof data.code === "number"
            ? data.code
            : 200
          : 200,
        message: data.message || "Successful",
        resources: data.data || {},
      };
    },
    error: (data) => {
      return {
        status: data.status
          ? typeof data.status === "boolean"
            ? data.status
            : false
          : false,
        code: data.code
          ? typeof data.code === "number"
            ? data.code
            : 500
          : 500,
        message: data.message || "Oops Something Went Wrong.......",
      };
    },
  });

  // env file configuration
  server.decorate("config", {
    env: config.envConfig,
  });

  // Common Queries
  server.decorate("dbQuery", {
    insertOne: (table, data) => {
      try {
        const empty = null;
        const columns = Object.keys(data).map(
          (key) => SQL`${SQL.quoteIdent(key)}`
        );
        const values = Object.keys(data).map((key) =>
          data[key] === "" ? SQL`${empty}` : SQL`${data[key]}`
        );
        return SQL`
                INSERT INTO ${SQL.quoteIdent(table)}
                (${SQL.glue(columns, " , ")})
                VALUES(${SQL.glue(values, " , ")});
                            `;
      } catch (error) {
        console.log("plugin ~ dbQuery ~ insertOne ~ error:", error);
        throw new Error(error);
      }
    },
    insertMany: (table, data) => {
      try {
        const columns = Object.keys(data[0]).map(
          (key) => SQL`${SQL.quoteIdent(key)}`
        );
        const values = data.map(
          (item) =>
            SQL`(${SQL.glue(
              Object.keys(item).map((key) => SQL`${item[key]}`),
              " , "
            )})`
        );
        return SQL`
                INSERT INTO ${SQL.quoteIdent(table)}
                (${SQL.glue(columns, " , ")})
                VALUES ${SQL.glue(values, " , ")};
            `;
      } catch (error) {
        console.log("plugin ~ dbQuery ~ insertMany ~ error:", error);
        throw new Error(error);
      }
    },
    insertOneOnDuplicate: (table, data, setData) => {
      try {
        const empty = null;
        const columns = Object.keys(data).map(
          (key) => SQL`${SQL.quoteIdent(key)}`
        );
        const values = Object.keys(data).map((key) =>
          data[key] === "" ? SQL`${empty}` : SQL`${data[key]}`
        );
        const setOnDuplicate = Object.keys(setData).map((key) =>
          setData[key] === ""
            ? SQL`${SQL.quoteIdent(key)} = ${empty}`
            : SQL`${SQL.quoteIdent(key)} = ${setData[key]}`
        );
        return SQL`
                INSERT INTO ${SQL.quoteIdent(table)}
                (${SQL.glue(columns, " , ")})
                VALUES(${SQL.glue(values, " , ")})
                ON DUPLICATE KEY UPDATE ${SQL.glue(setOnDuplicate, " , ")};`;
      } catch (error) {
        console.log("plugin ~ dbQuery ~ insertOne ~ error:", error);
        throw new Error(error);
      }
    },
    insertManyOnDuplicate: (table, data, setData) => {
      try {
        const columns = Object.keys(data[0]).map(
          (key) => SQL`${SQL.quoteIdent(key)}`
        );
        const values = data.map(
          (item) =>
            SQL`(${SQL.glue(
              Object.keys(item).map((key) => SQL`${item[key]}`),
              " , "
            )})`
        );
        const setOnDuplicate = Object.keys(setData).map((key) =>
          setData[key] === ""
            ? SQL`${SQL.quoteIdent(key)} = ${empty}`
            : SQL`${SQL.quoteIdent(key)} = ${SQL.unsafe(setData[key])}`
        );
        return SQL`
                INSERT INTO ${SQL.quoteIdent(table)} 
                (${SQL.glue(columns, " , ")}) 
                VALUES ${SQL.glue(values, " , ")} 
                ON DUPLICATE KEY UPDATE ${SQL.glue(setOnDuplicate, " , ")};`;
      } catch (error) {
        console.log("plugin ~ dbQuery ~ insertMany ~ error:", error);
        throw new Error(error);
      }
    },
    updateOne: (table, data, condition) => {
      try {
        const empty = null;
        const columns = Object.keys(data).map((key) =>
          data[key] === ""
            ? SQL`${SQL.quoteIdent(key)} = ${empty}`
            : SQL`${SQL.quoteIdent(key)} = ${data[key]}`
        );
        const whereCondition = Object.keys(condition).map((key) =>
          condition[key] === ""
            ? SQL`${SQL.quoteIdent(key)} = ${empty}`
            : SQL`${SQL.quoteIdent(key)} = ${condition[key]}`
        );

        return SQL`
                UPDATE ${SQL.quoteIdent(table)}
                SET ${SQL.glue(columns, " , ")}
                WHERE ${SQL.glue(whereCondition, " AND ")};
              `;
      } catch (error) {
        console.log("plugin ~ dbQuery ~ updateOne ~ error:", error);
        throw new Error(error);
      }
    },
    updateMany: (table, data, conditions) => {
      try {
        const empty = null;
        const columns = Object.keys(data).map((key) =>
          data[key] === ""
            ? SQL`${SQL.quoteIdent(key)} = ${empty}`
            : SQL`${SQL.quoteIdent(key)} = ${data[key]}`
        );
        const whereConditionColumn = Object.keys(conditions[0]).map(
          (key) => SQL`${SQL.quoteIdent(key)}`
        );
        const whereCondition = conditions.map(
          (item) =>
            SQL`${SQL.glue(
              Object.keys(item).map((key) => SQL`${item[key]}`),
              " , "
            )}`
        );

        return SQL`
                UPDATE ${SQL.quoteIdent(table)}
                SET ${SQL.glue(columns, " , ")}
                WHERE ${SQL.glue(whereConditionColumn)} IN (${SQL.glue(
          whereCondition,
          " , "
        )});
              `;
      } catch (error) {
        console.log("plugin ~ dbQuery ~ updateOne ~ error:", error);
        throw new Error(error);
      }
    },
    selectWithAnd: (requiredFields, table, condition) => {
      try {
        const empty = null;
        const columns = requiredFields.map(
          (key) => SQL`${SQL.quoteIdent(key)}`
        );
        const whereCondition = Object.keys(condition).map((key) =>
          condition[key] === ""
            ? SQL`${SQL.quoteIdent(key)} = ${empty}`
            : SQL`${SQL.unsafe(key)} = ${condition[key]}`
        );
        return SQL` SELECT ${SQL.glue(columns, " , ")}
                    FROM ${SQL.quoteIdent(table)}
                    WHERE ${SQL.glue(whereCondition, " AND ")}
                              `;
      } catch (error) {
        throw error;
      }
    },
  });

  // jwt authentication
  server.register(jwt);

  // database connection
  server.register(database);

  // registering all routes
  server.register(autoLoad, {
    dir: join(__dirname, "../routes"),
    dirNameRoutePrefix: false,
    options: { prefix: "/api/v1" },
  });
}

module.exports = fp(plugin);

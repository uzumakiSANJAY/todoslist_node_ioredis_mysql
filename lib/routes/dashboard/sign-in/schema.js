const schema = require("../../../schema/common_schema");

const getSchema = {
  schema: {
    tags: ["Example API's"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    response: {
      200: {
        description: "Default response",
        type: "object",
        properties: {
          status: schema.successSchema.status,
          code: schema.successSchema.code,
          resources: {
            type: "object",
            properties: {
              data: {
                type: "object",
                properties: {
                  PersonID: { type: "integer", example: 1 },
                  LastName: { type: "string", example: "Kumar" },
                  FirstName: { type: "string", example: "Ram" },
                  Address: { type: "string", example: "Karnataka" },
                  City: { type: "string", example: "Bengluru" },
                },
              },
            },
          },
        },
      },
      401: schema.unauthorizedErrorSchema,
      403: schema.forbiddenErrorSchema,
      500: schema.errorSchema,
    },
  },
};

const postSchema = {
  schema: {
    tags: ["Example API's"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    body: {
      type: "object",
      properties: { id: { type: "integer", default: 1 }, first_name: { type: "string", default: "Ram" }, date_of_birth: { type: "string", default: "01-01-2023" } },
      required: ["id", "first_name"],
    },
    response: {
      200: {
        description: "Default response",
        type: "object",
        properties: {
          status: schema.successSchema.status,
          code: schema.successSchema.code,
          message: { type: "string", example: "Successful" },
        },
      },
      401: schema.unauthorizedErrorSchema,
      403: schema.forbiddenErrorSchema,
      500: schema.errorSchema,
    },
  },
};

const putSchema = {
  schema: {
    tags: ["Example API's"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    params: {
      type: "object",
      properties: { id: { type: "integer" } },
      required: ["id"],
    },
    response: {
      200: {
        description: "Default response",
        type: "object",
        properties: {
          status: schema.successSchema.status,
          code: schema.successSchema.code,
          message: { type: "string", example: "Successful" },
        },
      },
      401: schema.unauthorizedErrorSchema,
      403: schema.forbiddenErrorSchema,
      500: schema.errorSchema,
    },
  },
};

module.exports = { getSchema, postSchema, putSchema };

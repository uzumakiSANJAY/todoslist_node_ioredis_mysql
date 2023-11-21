const successSchema = {
  status: {
    type: "boolean",
    example: true,
  },
  code: {
    type: "integer",
    example: 200,
  },
};

const errorSchema = {
  description: "Srever Error response",
  type: "object",
  properties: {
    status: {
      type: "boolean",
      description: "boolean type",
      example: false,
    },
    code: {
      type: "integer",
      description: "status code",
      example: 500,
    },
    message: {
      type: "string",
      description: "Error Message",
      example: "Something went wrong",
    },
  },
};

const badRequestErrorSchema = {
  description: "badRequestErrorSchema Error response",
  type: "object",
  properties: {
    status: {
      type: "boolean",
      description: "boolean type",
      example: false,
    },
    code: {
      type: "integer",
      description: "status code",
      example: 400,
    },
    message: {
      type: "string",
      description: "Error Message",
      example: "Bad Request",
    },
  },
};

const unauthorizedErrorSchema = {
  description: "Unauthorized Error response",
  type: "object",
  properties: {
    status: {
      type: "boolean",
      description: "boolean type",
      example: false,
    },
    code: {
      type: "integer",
      description: "status code",
      example: 401,
    },
    message: {
      type: "string",
      description: "Error Message",
      example: "Unauthorised Access",
    },
  },
};

const forbiddenErrorSchema = {
  description: "Forbidden Error response",
  type: "object",
  properties: {
    status: {
      type: "boolean",
      description: "boolean type",
      example: false,
    },
    code: {
      type: "integer",
      description: "status code",
      example: 403,
    },
    message: {
      type: "string",
      description: "Error Message",
      example: "Access Forbidden",
    },
  },
};

module.exports = {
  successSchema,
  errorSchema,
  badRequestErrorSchema,
  unauthorizedErrorSchema,
  forbiddenErrorSchema,
};

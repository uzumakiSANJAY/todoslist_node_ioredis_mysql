const schema = require("../../../../schema/common_schema");

const brandRegistrationSchema = {
  tags: ["Under development"],
  body: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Example:- Hindustan Aeronautics Limited",
        minLength: 1,
        maxLength: 200,
        errorMessage: {
          type: "Name must be string",
          minLength: "Name required",
          maxLength: "Name must be less than 200",
        },
      },
      description: {
        type: "string",
        description: "Example:- Top Indian aerospace company",
        maxLength: 200,
        errorMessage: {
          type: "Name must be string",
          maxLength: "Must be less than 200",
        },
      },
      primary_number: {
        type: "number",
        description: "Example:- 9876543210",
        minimum: 1000000000,
        maximum: 9999999999,
        errorMessage: {
          type: "Name must be number",
          minimum: "Phone number must be 10 digit",
          maximum: "Phone number must be 10 digit",
        },
      },
      secondary_number: {
        type: "number",
        description: "Example:- 9876543211",
        minimum: 1000000000,
        maximum: 9999999999,
        errorMessage: {
          type: "Name must be number",
          minimum: "Phone number must be 10 digit",
          maximum: "Phone number must be 10 digit",
        },
      },
      email: {
        type: "string",
        description: "Example:- test@gmail.com",
        minLength: 1,
        maxLength: 200,
        errorMessage: {
          type: "Email must be string",
          minimum: "Email required",
          maxLength: "Email must be less than 200 characters",
        },
      },
      access_token: {
        type: "string",
        description: "Example:- F@tri@jf*ja",
        minLength: 8,
        maxLength: 20,
        errorMessage: {
          type: "Password must be string",
          minimum: "Password must be greater than 8 characters",
          maxLength: "Password must be less than 20 characters",
        },
      },
    },
    examples: [
      {
        name: "Baker Watkin Accounting Ltd.",
        description: "Test Team2",
        primary_number: 9876543210,
        secondary_number: 9876543210,
        email: "test@gmail.com",
        access_token: "F@tri@jf*ja",
      },
    ],
    required: ["name", "email", "access_token"],
    errorMessage: {
      required: {
        name: 'Name required!', 
        email: 'Email required!' ,
        access_token : 'Password required!'
      }
    },
    additionalProperties: false,
  },
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
                id: { type: "integer", example: 1 },
                name: {
                  type: "string",
                  example: "Hindustan Aeronautics Limited",
                },
                email: { type: "string", example: "test@gmail.com" },
                primary_number: { type: "number", example: 9876543210 },
              },
            },
          },
        },
      },
    },
    400: schema.badRequestErrorSchema,
    401: schema.unauthorizedErrorSchema,
    403: schema.forbiddenErrorSchema,
    500: schema.errorSchema,
  },
};

// const getSchema = {
//   schema: {
//     tags: ["Example API's"],
//     security: [
//       {
//         bearerAuth: [],
//       },
//     ],
//     response: {
//       200: {
//         description: "Default response",
//         type: "object",
//         properties: {
//           status: schema.successSchema.status,
//           code: schema.successSchema.code,
//           resources: {
//             type: "object",
//             properties: {
//               data: {
//                 type: "object",
//                 properties: {
//                   PersonID: { type: "integer", example: 1 },
//                   LastName: { type: "string", example: "Kumar" },
//                   FirstName: { type: "string", example: "Ram" },
//                   Address: { type: "string", example: "Karnataka" },
//                   City: { type: "string", example: "Bengluru" },
//                 },
//               },
//             },
//           },
//         },
//       },
//       401: schema.unauthorizedErrorSchema,
//       403: schema.forbiddenErrorSchema,
//       500: schema.errorSchema,
//     },
//   },
// };

// const postSchema = {
//   schema: {
//     tags: ["Example API's"],
//     security: [
//       {
//         bearerAuth: [],
//       },
//     ],
//     body: {
//       type: "object",
//       properties: { id: { type: "integer", default: 1 }, first_name: { type: "string", default: "Ram" }, date_of_birth: { type: "string", default: "01-01-2023" } },
//       required: ["id", "first_name"],
//     },
//     response: {
//       200: {
//         description: "Default response",
//         type: "object",
//         properties: {
//           status: schema.successSchema.status,
//           code: schema.successSchema.code,
//           message: { type: "string", example: "Successful" },
//         },
//       },
//       401: schema.unauthorizedErrorSchema,
//       403: schema.forbiddenErrorSchema,
//       500: schema.errorSchema,
//     },
//   },
// };

// const putSchema = {
//   schema: {
//     tags: ["Example API's"],
//     security: [
//       {
//         bearerAuth: [],
//       },
//     ],
//     params: {
//       type: "object",
//       properties: { id: { type: "integer" } },
//       required: ["id"],
//     },
//     response: {
//       200: {
//         description: "Default response",
//         type: "object",
//         properties: {
//           status: schema.successSchema.status,
//           code: schema.successSchema.code,
//           message: { type: "string", example: "Successful" },
//         },
//       },
//       401: schema.unauthorizedErrorSchema,
//       403: schema.forbiddenErrorSchema,
//       500: schema.errorSchema,
//     },
//   },
// };

module.exports = { brandRegistrationSchema };

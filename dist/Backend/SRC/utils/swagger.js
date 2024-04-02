"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const logger_1 = __importDefault(require("./logger"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// import fs from "fs";
// const options: swaggerJsdoc.Options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "My Brand Backend v1.0",
//             description:
//                 "Welcome to My Brand Backend API. This API serves as the backbone for managing various aspects of My Brand, providing essential functionalities to power your application. It offers endpoints for user authentication, blog management, image uploads, and much more. With robust security measures and intuitive design, My Brand Backend API empowers developers to build powerful applications with ease.",
//             version: "v1.0",
//         },
//         components: {
//             securitySchemes: {
//                 bearerAuth: {
//                     type: "apiKey",
//                     name: "x-auth-token",
//                     in: "header",
//                     description: "Bearer token authorization",
//                 },
//             },
//             schemas: {
//                 User: {
//                     type: 'object',
//                     properties: {
//                         names: { type: 'string' },
//                         email: { type: 'string' },
//                         password: { type: 'string' },
//                         isAdmin: { type: 'boolean' },
//                     },
//                     required: ['names', 'email', 'password', 'isAdmin'],
//                 },
//                 Blog: {
//                     type: 'object',
//                     properties: {
//                         title: { type: 'string' },
//                         content: { type: 'string' },
//                         imageUrl: { type: 'string' },
//                         comments: { type: 'array' },
//                         likes: { type: 'number' },
//                         creationDate: { type: 'string', format: 'date-time' }
//                     },
//                     required: ['title', 'content', 'imageUrl'],
//                 },
//                 Message: {
//                     type: 'object',
//                     properties: {
//                         sender: { type: 'string' },
//                         subject: { type: 'string' },
//                         content: { type: 'string' },
//                         email: { type: 'string' },
//                         date: { type: 'string', format: 'date-time' }
//                     }
//                 }
//             },
//         },
//         //   servers: [
//         //     {
//         //       url: "http://localhost:3000/docs",
//         //       description: "Local development environment",
//         //     },
//         //     {
//         //       url: "https://mybrandbackend-q8gq.onrender.com/docs/",
//         //       description: "Production Environment",
//         //     },
//         //   ],
//     },
//     apis: ["../server.ts", "../routes/*.ts"],
//     //apis: ["../../../dist/Backend/SRC/routes/*.js"]
// };
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My Brand Backend v1.0",
            description: "Welcome to My Brand Backend API. This API serves as the backbone for managing various aspects of My Brand, providing essential functionalities to power your application. It offers endpoints for user authentication, blog management, image uploads, and much more. With robust security measures and intuitive design, My Brand Backend API empowers developers to build powerful applications with ease.",
            version: "v1.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "apiKey",
                    name: "x-auth-token",
                    in: "header",
                    description: "Bearer token authorization",
                },
            },
        },
    },
    apis: ["../server.ts", "../routes/.ts", "./src/schemas/.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app, port) {
    // Serve Swagger UI
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    // Serve Swagger JSON
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    // Log Swagger availability
    logger_1.default.info(`Swagger docs available at http://localhost:${port}/docs`);
}
exports.default = swaggerDocs;

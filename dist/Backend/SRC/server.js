"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const mongoose_1 = __importDefault(require("mongoose"));
//import { describe } from 'node:test';
const userRoutes = require('./routes/usersRoutes');
const blogRoutes = require('./routes/blogsRoutes');
const messageRoutes = require('./routes/messagesRoutes');
const swaggerjsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');
const swagger_1 = __importDefault(require("./utils/swagger"));
const cookieParser = require('cookie-parser');
const app = express();
const url = "mongodb+srv://nyanja-cyane:nyanja@cluster0.qmnp1kf.mongodb.net/<my_brand_db>?retryWrites=true&w=majority";
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(url);
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.error(error);
        }
    });
}
app.use(express.json());
/**
 * @openapi
 * /api/users/me:
 *   get:
 *     tags:
 *       - User
 *     description: Get current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Current user retrieved successfully
 *       '401':
 *         description: Unauthorized - user authentication failed
 */
app.use('/blogs', blogRoutes);
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);
//app.use(cookieParser());
connect();
(0, swagger_1.default)(app, 8000);
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
module.exports = app;

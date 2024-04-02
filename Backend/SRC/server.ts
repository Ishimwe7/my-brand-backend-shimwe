const express = require('express');
import mongoose from 'mongoose';
//import { describe } from 'node:test';
const userRoutes = require('./routes/usersRoutes');
const blogRoutes = require('./routes/blogsRoutes');
const messageRoutes = require('./routes/messagesRoutes');

const swaggerjsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');
import swaggerDocs from './utils/swagger';

const cookieParser = require('cookie-parser');
const app = express();
const url = "mongodb+srv://nyanja-cyane:nyanja@cluster0.qmnp1kf.mongodb.net/<my_brand_db>?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
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
swaggerDocs(app, 8000)
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
module.exports = app;


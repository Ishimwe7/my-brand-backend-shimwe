const express = require('express');
//const mongoose = require('mongoose');
import mongoose from 'mongoose';
import { describe } from 'node:test';
//const blogController = require('./controllers/blogsController');
const userRoutes = require('./routes/usersRoutes');
const blogRoutes = require('./routes/blogsRoutes');
const messageRoutes = require('./routes/messagesRoutes');

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

app.use('/blogs', blogRoutes);
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);
app.use(cookieParser());
connect();
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
module.exports = app;


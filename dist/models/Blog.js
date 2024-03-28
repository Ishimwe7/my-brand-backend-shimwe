"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, requires: true },
    imageUrl: { type: String, required: true },
    comments: { type: Array, default: [] },
    likes: { type: Number, default: 0 },
    creationDate: { type: Date, default: Date.now() }
});
module.exports = mongoose.model("Blog", blogSchema);

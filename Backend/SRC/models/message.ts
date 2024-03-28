const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const messageSchema = new Schema({
    subject: { type: String, required: true },
    content: { type: String, required: true },
    sender: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, default:Date.now() }
});

module.exports = mongoose.model("Message", messageSchema);
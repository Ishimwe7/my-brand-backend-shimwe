"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const messageSchema = new mongoose_2.Schema({
    subject: { type: String, required: true },
    content: { type: String, required: true },
    sender: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, default: Date.now() }
});
module.exports = mongoose_1.default.model("Message", messageSchema);

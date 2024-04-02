"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const blogSchema = new mongoose_2.Schema({
    title: { type: String, required: true },
    content: { type: String, requires: true },
    imageUrl: { type: String, required: true },
    comments: { type: Array, default: [] },
    likes: { type: Number, default: 0 },
    creationDate: { type: Date, default: Date.now() }
});
module.exports = mongoose_1.default.model("Blog", blogSchema);

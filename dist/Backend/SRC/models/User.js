"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
// Create a Mongoose schema using the User interface
const userSchema = new mongoose_2.Schema({
    names: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
});
module.exports = mongoose_1.default.model("User", userSchema);

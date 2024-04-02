"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const blogValidationSchema = joi_1.default.object({
    _id: joi_1.default.string().optional(),
    title: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    imageUrl: joi_1.default.string().required(),
    comments: joi_1.default.array(),
    likes: joi_1.default.number()
});
//console.log(blogValidationSchema);
module.exports = blogValidationSchema;

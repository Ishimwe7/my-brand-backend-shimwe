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
const express_1 = __importDefault(require("express"));
const Message = require('../models/Message');
const { requireAuth } = require('../middlewares/authMiddleware');
const router = express_1.default.Router();
const messageValidation = require('../validations/messagesValidations');
const messageController = {
    sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = yield messageValidation.validateAsync(req.body);
                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                }
                const { subject, content, sender, email } = req.body;
                const message = new Message({
                    subject,
                    content,
                    sender,
                    email,
                    date: Date.now()
                });
                yield message.save();
                res.status(201).json(message);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server Error' });
            }
        });
    },
    deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.blogId;
                const message = yield Message.findByIdAndDelete(id);
                if (!message) {
                    return res.status(404).json({ message: 'Message not found' });
                }
                res.json({ message: 'Message deleted successfully' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server Error' });
            }
        });
    },
    getAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield Message.find();
                res.json(messages);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server Error' });
            }
        });
    },
    getMessageById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messageId = req.params.messageId;
                const message = yield Message.findById(messageId);
                if (!message) {
                    return res.status(404).json({ error: 'Message not found' });
                }
                res.json(message);
            }
            catch (error) {
                console.error('Error retrieving post:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    },
};
//export default router;
module.exports = messageController;

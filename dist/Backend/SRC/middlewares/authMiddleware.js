"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const app = (0, express_1.default)();
app.use(cookieParser());
const requireAuth = (req, res, next) => {
    // const token = req.cookies.jwt;
    const token = req.params.authorization;
    // const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        jwt.verify(token, "nyanja cyane secret", (err, decodedToken) => {
            if (err) {
                return res.json({ "Un authorized": "Un authorized access to this End point" });
            }
            else {
                //res.json({ "Token": decodedToken });
                //re.user = decodedToken;
                next();
            }
        });
    }
    else {
        res.json({ "Access denied": "Login first" });
    }
};
module.exports = requireAuth;

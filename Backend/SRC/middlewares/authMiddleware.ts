import express, { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Import cookie-parser

const app = express();

app.use(cookieParser());

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    // const token = req.cookies.jwt;
    const token = req.params.authorization;
    // const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        jwt.verify(token, "nyanja cyane secret", (err: any, decodedToken: any) => {
            if (err) {
                return res.json({ "Un authorized": "Un authorized access to this End point" });
            }
            else {
                //res.json({ "Token": decodedToken });
                //re.user = decodedToken;
                next();
            }
        })
    }
    else {
        res.json({ "Access denied": "Login first" })
    }
}

module.exports = requireAuth;
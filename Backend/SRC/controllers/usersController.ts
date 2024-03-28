
import express, { Request, Response } from 'express';
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { requireAuth } = require('../middlewares/authMiddleware')
const jwt = require('jsonwebtoken');

const router = express.Router();

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isStrongPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const age = 24 * 60 * 60;

const generateToken = (id: number) => {
    const token = jwt.sign({ id }, 'nyanja cyane secret', { expiresIn: age });
    return token;
};

const userController = {
    async createNewUser(req: Request, res: Response) {
        try {
            const { names, email, password, isAdmin } = req.body;
            if (!names || !email || !password) return res.status(400).json({ 'message': 'Both names, email and password are required!!' });
            if (!isValidEmail(email)) {
                return res.status(500).json({ Invalid: 'Sorry!! You provided an invalid email.' })
            }
            if (!isStrongPassword(password)) {
                return res.status(500).json({ Invalid: 'Sorry!! Your password is weak.' })
            }
            const duplicate = await User.findOne({ email: email }).exec();
            if (duplicate) return res.status(409).json({ "duplicateError": "Email already used!" });
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = new User({
                names,
                email,
                password: hashedPassword,
                isAdmin
            });
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { names, email, password } = req.body;
            if (!isValidEmail(email)) {
                return res.status(500).json({ Invalid: 'Sorry!! You provided an invalid email.' })
            }
            if (!isStrongPassword(password)) {
                return res.status(500).json({ Invalid: 'Sorry!! Your password is weak.' })
            }
            const user = await User.findByIdAndUpdate(id, { names, email, password }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { email, password } = req.body;
            if (!password) {
                return res.status(400).json({ message: 'Password is required' });
            }
            const user = await User.findOne({ email, password });
            if (!user) {
                return res.status(404).json({ message: `User not found ! Can't delete User` });
            }
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await User.find().select('names email isAdmin');
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async getUserById(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error('Error retrieving user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },


    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found !' });
            }
            else {
                const auth = await bcrypt.compare(password, user.password);
                if (auth) {
                    const token = generateToken(user._id);
                    // res.cookie('jwt', token, { httpOnly: true, maxAge: age });
                    //const headers = new res.header;
                    res.json({ "User login succes with id ": user._id });
                    res.setHeader('Authorization', `${token}`);
                }
                else {
                    return res.status(400).json({ Error: 'Login Failed. Password is incorrect !' });
                }
            }
            //res.json({ "Login": "Login Success" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }
};

module.exports = userController;

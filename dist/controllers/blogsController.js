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
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');
const { requireAuth } = require('../middlewares/authMiddleware');
const blogValidation = require('../validations/blogValidations');
const router = express_1.default.Router();
const blogController = {
    addBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = yield blogValidation.validateAsync(req.body);
                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                    // res.status(400).json(error);
                }
                const { title, content, imageUrl } = req.body;
                const blog = new Blog({
                    title,
                    content,
                    imageUrl,
                    comments: [],
                    likes: 0,
                    creationDate: Date.now()
                });
                yield blog.save();
                res.status(201).json(blog);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server Error' });
            }
        });
    },
    updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.blogId;
                // const { error, value } = await blogValidation.validateAsync(req.body);
                // if (error) {
                //     res.status(400).json(error);
                // }
                const { title, content, image, comments, likes } = req.body;
                const todo = yield Blog.findByIdAndUpdate(id, { title, content, image, comments, likes }, { new: true });
                if (!todo) {
                    return res.status(404).json({ message: 'Blog not found' });
                }
                res.json(todo);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server Error' });
            }
        });
    },
    deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.blogId;
                const todo = yield Blog.findByIdAndDelete(id);
                if (!todo) {
                    return res.status(404).json({ message: 'Blog not found' });
                }
                res.json({ message: 'Blog deleted successfully' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server Error' });
            }
        });
    },
    getAllBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield Blog.find();
                res.json(blogs);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server Error' });
            }
        });
    },
    getBlogById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogId = req.params.blogId;
                const blog = yield Blog.findById(blogId);
                if (!blog) {
                    return res.status(404).json({ error: 'Blog not found' });
                }
                res.json(blog);
            }
            catch (error) {
                console.error('Error retrieving post:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    },
    addCommentToBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogId = req.params.blogId;
                const { author, content } = req.body;
                const blog = yield Blog.findById(blogId);
                if (!blog) {
                    return res.status(404).json({ error: 'Blog not found' });
                }
                const newCommentId = blog.comments.length + 1;
                const newComment = {
                    id: newCommentId,
                    author: author, // Assuming author is the ID of the user who posted the comment
                    content: content,
                    likes: 0,
                    replies: [],
                    addedDate: Date.now()
                };
                blog.comments.push(newComment);
                const updatedBlog = yield blog.save();
                res.json(updatedBlog);
            }
            catch (error) {
                console.error('Error adding comment to Blogt:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    },
    // async replyToComment(req: Request, res: Response) {
    //     try {
    //         //const blogId = req.params.blogId;
    //         const { blogId, commentId, author, content } = req.body;
    //         const blog = await Blog.findById(blogId);
    //         if (!blog) {
    //             return res.status(404).json({ error: 'Blog not found' });
    //         }
    //         else {
    //             const comment = await blog.comments.find(comment: Comment => comment.id === commentId);
    //             const newReplyId = blog.replies.length + 1;
    //             const newComment = {
    //                 id: newReplyId,
    //                 author: author,
    //                 content: content,
    //             };
    //             blog.comments.push(newComment);
    //             const updatedBlog = await blog.save();
    //             res.json(updatedBlog);
    //         }
    //     } catch (error) {
    //         console.error('Error adding comment to Blogt:', error);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // },
    likeBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogId = req.params.blogId;
                const blog = yield Blog.findById(blogId);
                if (!blog) {
                    return res.status(404).json({ error: 'Blog not found' });
                }
                blog.likes++;
                const updatedBlog = yield blog.save();
                res.json(updatedBlog);
            }
            catch (error) {
                console.error('Error liking blog:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    },
    unlikeBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogId = req.params.blogId;
                const blog = yield Blog.findById(blogId);
                if (!blog) {
                    return res.status(404).json({ error: 'Blog not found' });
                }
                if (blog.likes > 0) {
                    blog.likes--;
                }
                const updatedBlog = yield blog.save();
                res.json(updatedBlog);
            }
            catch (error) {
                console.error('Error unliking blog:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
};
//export default router;
module.exports = blogController;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// //const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const express_1 = __importDefault(require("express"));
const BlogController = require('../controllers/blogsController');
const router = express_1.default.Router();
// /**
//  * @swagger
//  * tags:
//  *   name: Blogs
//  *   description: Blogs Endpoints
//  */
// /**
//  * @swagger
//  * /newBlog:
//  *   post:
//  *     summary: Create new Blog
//  *     tags: [Blogs]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Blog'
//  *     responses:
//  *       '201':
//  *         description: Successfully created new Blog
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Blog'
//  *       '400':
//  *         description: Bad request
//  *       '500':
//  *         description: Internal server error
//  */
/**
 * @openapi
 * /blogs/newBlog/:
 *   post:
 *     tags:
 *       - User
 *     description: Create a new blog
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       '201':
 *         description: Blog created successfully
 *       '401':
 *         description: Unauthorized - user authentication failed
 *       '500':
 *         description: Internal server error
 */
router.post('/newBlog/:authorization/', authMiddleware, BlogController.addBlog);
/**
 * @swagger
 * /allUsers:
 *   get:
 *     summary: Get all Blogs
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all Blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       '500':
 *         description: Internal server error
 */
router.get('/allBlogs/', BlogController.getAllBlogs);
/**
 * @swagger
 * /getBlog/{blogId}:
 *   get:
 *     summary: Get a specific blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
router.get('/getBlog/:blogId/:authorization/', authMiddleware, BlogController.getBlogById);
/**
 * @swagger
 * /editBlog/{blogId}:
 *   put:
 *     summary: Update a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       '200':
 *         description: Successfully updated the blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
router.put('/editBlog/:blogId/:authorization/', authMiddleware, BlogController.updateBlog);
/**
 * @swagger
 * /deleteBlog/{blogId}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted the blog
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/deleteBlog/:blogId/:authorization/', authMiddleware, BlogController.deleteBlog);
/**
 * @swagger
 * /addComment/{blogId}/comments:
 *   post:
 *     summary: Add a comment to a blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to add the comment
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *             required:
 *               - comment
 *     responses:
 *       '201':
 *         description: Successfully added the comment
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/addComment/:blogId/comments/:authorization/', authMiddleware, BlogController.addCommentToBlog);
/**
 * @swagger
 * /addLike/{blogId}/like:
 *   post:
 *     summary: Add a like to a blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to like
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully added the like
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
router.post('/addLike/:blogId/like/:authorization/', authMiddleware, BlogController.likeBlog);
/**
 * @swagger
 * /unLike/{blogId}/like:
 *   delete:
 *     summary: Remove a like from a blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to remove the like
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully removed the like
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/unLike/:blogId/like/:authorization/', authMiddleware, BlogController.unlikeBlog);
module.exports = router;

"use strict";
/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blogs Endpoints
 */
/**
 * @swagger
 * /newBlog:
 *   post:
 *     summary: Create new Blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       '201':
 *         description: Successfully created new Blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */ 

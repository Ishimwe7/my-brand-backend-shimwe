const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blogsController');


router.post('/newBlog', BlogController.addBlog);
router.get('/allBlogs', BlogController.getAllBlogs);
router.get('/getBlog/:blogId', BlogController.getBlogById);
router.put('/editBlog/:blogId', BlogController.updateBlog);
router.delete('/deleteBlog/:blogId', BlogController.deleteBlog);
router.post('/addComment/:blogId/comments', BlogController.addCommentToBlog);
router.post('/addLike/:blogId/like', BlogController.likeBlog);
router.delete('/unLike/:blogId/like', BlogController.unlikeBlog);

module.exports = router;
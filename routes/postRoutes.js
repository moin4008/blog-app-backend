const express = require('express');
const {
  createPost, updatePost, deletePost, getAllPosts, getPost, getPostsByTag
} = require('../controllers/postController');
const authenticate = require('../middlewares/auth');

const postRouter = express.Router();
postRouter.post('/create', authenticate, createPost);
postRouter.put('/update', authenticate, updatePost);
postRouter.delete('/delete/:id', authenticate, deletePost);
postRouter.get('/all', getAllPosts);
postRouter.get('/:id', getPost);
postRouter.get('/tag/:tag', getPostsByTag);

module.exports = postRouter ;

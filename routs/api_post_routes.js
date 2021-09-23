const express = require('express');
const router = express.Router();
const {
   getPost,
   deletePost,
   editPost,
   getPosts,
   addPost } = require('../controllers/api-post-controller');

   router.get('/api/posts', getPosts);
   router.get('/api/post/:id', getPost);
   router.post('/api/add-post', addPost );
   router.put('/api/edit/:id', editPost );
   router.delete('/api/post/:id', deletePost);

module.exports = router;
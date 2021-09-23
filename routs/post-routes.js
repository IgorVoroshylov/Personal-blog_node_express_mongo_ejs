const express = require('express');
const router = express.Router();
const {
   getPost,
   deletePost,
   getEditPost,
   editPost,
   getPosts,
   getAddPost,
   addPost } = require('../controllers/post-controller');

// get posts & post
router.get('/posts', getPosts);
router.get('/posts/:id', getPost);
// add post
router.get('/add-post', getAddPost);
router.post('/add-post', addPost );
// post edit
router.get('/edit/:id', getEditPost);
router.put('/edit/:id', editPost );
// delete post
router.delete('/posts/:id', deletePost);

module.exports = router;
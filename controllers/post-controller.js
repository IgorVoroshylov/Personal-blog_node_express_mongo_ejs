const Post = require('../models/post'); // схемы данных для db
const createPath = require('../helpers/create-path');

const handleError = (res, err) => {
   console.log(err);
   res.render(createPath('error'), {title: 'Error'});
}

// get posts & post
const getPosts = (req, res) => {
   const title = 'Posts';
   Post.find()
   .sort({createdAt: -1}) // сортируем посты по убыванию
   .then( posts => res.render(createPath('posts'), {title, posts}) )
   .catch( err => handleError(res, err));
}

const getPost = (req, res) => {
   const title = 'Post';
   Post.findById(req.params.id)
   .then( post => res.render(createPath('post'), {title, post}) )
   .catch( err => handleError(res, err));
}

// add post
const getAddPost = (req, res) => {
   const title = 'Add post';
   res.render(createPath('add-post'), {title});
}

const addPost = (req, res) => {
   const {title, author, text} = req.body;
   const post = new Post({title, author, text});
   post.save()
      .then(result => res.redirect('/posts'))
      .catch(err => handleError(res, err));
}

// post edit
const getEditPost = (req, res) => {
   const title = 'Edit Post';
   Post.findById(req.params.id)
   .then( post => res.render(createPath('edit-post'), {title, post}) )
   .catch( err => handleError(res, err));
}

const editPost = (req, res) => {
   const {title, author, text} = req.body;
   const {id} = req.params;
   Post.findByIdAndUpdate(id, {title, author, text})
   .then( result => res.redirect(`/posts/${id}`))
   .catch( err => handleError(res, err));
}

// delete post
const deletePost = (req, res) => {
   Post.findByIdAndDelete(req.params.id)
   .then( result => {
      res.sendStatus(200);
   } )
   .catch( err => handleError(res, err));
}

module.exports = { getPosts, getPost, getAddPost, addPost, getEditPost, editPost, deletePost };
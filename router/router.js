const express = require('express');
const {userSignup, userLogin} = require('../controller/authUser');
const {createBlog, getAllBlog, getAuthorBlog} = require('../controller/blogs');
const userAuthenticate = require('../middleware/authenAuthorize');
const isAuthorize = require('../middleware/authorization');
const {createBlogComment, getComment} = require('../controller/comments');
const userRoute = express.Router();

//user route
userRoute.post("/signup", userSignup);
userRoute.post("/login", userLogin);

//blog route
userRoute.post("/createBlog", userAuthenticate,isAuthorize, createBlog);
userRoute.get("/getpost", getAllBlog);
userRoute.get("/getpostAuthor/", userAuthenticate,isAuthorize, getAuthorBlog);

//comment route
userRoute.post("/createComment/:id", userAuthenticate, createBlogComment);
userRoute.get("/getpostComment/:id", userAuthenticate, getComment);

module.exports = userRoute;
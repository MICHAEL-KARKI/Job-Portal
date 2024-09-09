
const express = require('express');
const blogRouter = express.Router();

const blogsController = require("../controllers/blogController");

blogRouter.get('/', blogsController.renderBlogs);

module.exports = blogRouter;
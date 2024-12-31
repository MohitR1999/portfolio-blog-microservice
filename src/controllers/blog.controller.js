const { MISSING_TOKEN, INVALID_TOKEN, MISSING_BLOG_TITLE, MISSING_BLOG_CONTENT } = require("../constants/Error");
const { UNAUTHORIZED, ACCESS_DENIED, SUCCESS_OK, INTERNAL_SERVER_ERROR, SUCCESS_CREATED } = require("../constants/StatusCodes");
const MissingTokenError = require("../Errors/MissingTokenError");
const NotFoundError = require("../Errors/NotFoundError");
const ValidationError = require("../Errors/ValidationError");
const Blog = require("../models/Blog");
const { getTokenFromHeaders } = require("../utils/utilities")
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const createBlog = async (req, res) => {
    const token = getTokenFromHeaders(req);
    if (!token) {
        throw new MissingTokenError();
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;
        // since the user is verified, we can now go on to create the blog post
        const { title, content } = req.body;
        // do some error handling
        if (!title) {
            throw new ValidationError(MISSING_BLOG_TITLE);
        }

        else if (!content) {
            throw new ValidationError(MISSING_BLOG_CONTENT);
        }

        else {
            // everything is fine, we are good to go
            const blog = new Blog({
                title,
                content,
                author : userId,
            });

            await blog.save();
            res.status(SUCCESS_CREATED).json(blog);
        }

    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(ACCESS_DENIED).json({
                error : INVALID_TOKEN
            })
        }

        else if (!err.status) {
            console.log(err);
            return res.status(INTERNAL_SERVER_ERROR).json({
                error : `Internal server error: ${err.message}`
            })
        }
        
        else {
            return res.status(err.status).json({
                error : err.message
            })
        }
    }
}

const getBlogById = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) {
            throw new ValidationError("Please provide the id of the blog");
        }
        
        const post = await Blog.findById(id);
        if (post) {
            res.status(SUCCESS_OK).json(post);
        } else {
            throw new NotFoundError("Blog");
        }
    } catch (err) {
        if (!err.status) {
            console.log(err);
            return res.status(INTERNAL_SERVER_ERROR).json({
                error: `Internal server error: ${err.message}`
            })
        }

        else {
            return res.status(err.status).json({
                error: err.message
            })
        }
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const posts = await Blog.find({});
        if (posts && posts.length > 0) {
            res.status(SUCCESS_OK).json(posts);
        } else {
            throw new NotFoundError("Blogs");
        }
    } catch (err) {
        if (!err.status) {
            console.log(err);
            return res.status(INTERNAL_SERVER_ERROR).json({
                error: `Internal server error: ${err.message}`
            })
        }

        else {
            return res.status(err.status).json({
                error: err.message
            })
        }
    }
}

const updateBlog = async (req, res) => {
    const id = req.params.id;
    const token = getTokenFromHeaders(req);
    if (!token) {
        throw new MissingTokenError();
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;
        if (!id) {
            throw new ValidationError("Please provide the id of the blog");
        }
        const { title, content } = req.body;
        if (!title && !content) {
            throw new ValidationError("Please provide either title or content to be updated");
        }

        const post = await Blog.findById(id);
        if (post) {
            // if we modify the title, then change it
            if (title) {
                post.title = title;
            }
            // if we modify the content, then change it
            if (content) {
                post.content = content;
            }

            post.modified_at = Date.now();
            await post.save();
            res.status(SUCCESS_OK).json(post);
        } else {
            throw new NotFoundError("Blog");
        }
    } catch (err) {
        if (!err.status) {
            console.log(err);
            return res.status(INTERNAL_SERVER_ERROR).json({
                error: `Internal server error: ${err.message}`
            })
        }

        else {
            return res.status(err.status).json({
                error: err.message
            })
        }
    }
}

const deleteBlog = async (req, res) => {

}

module.exports = {
    createBlog,
    getBlogById,
    getAllBlogs,
    updateBlog,
    deleteBlog
}
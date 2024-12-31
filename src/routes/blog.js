const express = require('express');
const 
{   createBlog, 
    deleteBlog, 
    getAllBlogs, 
    getBlogById, 
    updateBlog 
} = require('../controllers/blog.controller');
const router = express.Router();

router.post("/", createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
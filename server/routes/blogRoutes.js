import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogByID,
  generateContent,
  getAllBlogs,
  getBlogByID,
  getBlogComments,  
  togglePublish
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();


blogRouter.get('/all', getAllBlogs);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments);
blogRouter

// ✅ Then dynamic and protected routes
blogRouter.post('/add', auth, upload.single("image"), addBlog);
blogRouter.post('/delete', auth, deleteBlogByID);
blogRouter.post('/toggle-publish', auth, togglePublish);

// ✅ Dynamic route LAST
blogRouter.get('/:blogID', getBlogByID);
blogRouter.post('/generate',auth,generateContent);

export default blogRouter;

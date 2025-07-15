import express from "express";
import { addBlog, deleteBlogByID, getAllBlogs, getBlogByID, togglePublish } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

// Correct middleware order:
blogRouter.post("/add", auth, upload.single("image"), addBlog);
export default blogRouter;
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:blogID',getBlogByID);
blogRouter.post('/delete',auth, deleteBlogByID);
blogRouter.post('/toggle-publish',auth, togglePublish);



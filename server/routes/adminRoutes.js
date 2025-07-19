import express from "express";
import { adminLogin,getAllBlogsAdmin,getAllCommentsAdmin,deleteCommentById,approveCommentById,getDashboard} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login",adminLogin);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.get("/comments",auth, getAllCommentsAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);
adminRouter.get("/dashboard",auth, getDashboard);

export default adminRouter;
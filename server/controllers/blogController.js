import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import { error } from "console";
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js";

export const addBlog = async (req, res) => {
  try {
    console.log("=== Incoming Blog Upload ===");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    const {title,subTitle,description,category,isPublished} = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    if (!title || !description || !category) {
      return res.json({success: false, message: "Missing required fields" })
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    //Upload Image to ImageKit
    const response = await imagekit.upload(
      {
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: "/blogs"
      })
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        {quality: 'auto'},
        {format: 'webp'},
        {width: '1280'}
      ]
    });

    const image = optimizedImageUrl;
    await Blog.create({title,subTitle,description,category,image,isPublished});

    res.json({success: true, message: "Blog Added Successfully"});

    return res.status(200).json({
      success: true,
      message: "Image received successfully",
      fileInfo: {
        filename: imageFile.filename,
        originalname: imageFile.originalname,
        mimetype: imageFile.mimetype,
        path: imageFile.path
      }
    });

  } catch (err) {
    console.error("❌ Upload Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getAllBlogs =  async(req,res)=>{
  try {
    const blogs = await Blog.find({isPublished: true})
    res.json({success: true, blogs})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}

export const getBlogByID = async (req,res) => {
  try {
    const {blogID} = req.params;
    const blog = await Blog.findById(blogID)
    if (!blog) {
      return res.json({success: false, message: "Blog Not Found"});
    }
    res.json({success: true, blog})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}


export const deleteBlogByID = async (req,res) => {
  try {
    const {id} = req.body;
    // const blog = await Blog.findById(id);
    await Blog.findByIdAndDelete(id);

    //Delete all the commnents that associated with this blog
    await Comment.deleteMany({blog: id});

    res.json({success: true,message: "Blog Deleted Successfully...."});
    res.json({success: true, blog});
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}


export const togglePublish = async (req, res) => {
  try {
    const {id} = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({success: true,message: "Blog Status Updated.."})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}


export const addComment = async (req, res) => {
  try {
    const {blog, name, content} = req.body;
    await Comment.create({blog,name,content});
     res.json({success: true, message: 'Comment added fir review'})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}


export const getBlogComments = async (req, res) => {
  try {
    const {blogID} = req.body;
    const comments = await Comment.find({blog: blogID, isApproved: true }).sort({createdAt: -1});
    res.json({success: true, comments});
  } catch (error) {
    res.json({success: false, message: error.message})
  }

}


export const generateContent = async (req, res) => {
  try {
    const {prompt} = req.body;
    const content = await main(prompt + ' Generate a blog post about this topic');
    res.json({success: true, content});
    console.log("Generated Content:", content);
  }
  catch (error) {
    res.json({success: false, message: error.message});
    console.error("Error generating content:", error);
  }
};
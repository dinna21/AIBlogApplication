import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import { error } from "console";

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
    const {blogID} = req.parse;
    const blog = await Blog.findById(blogID)
    if (!blog) {
      return res.json({success: false, message: "Blog Not Found"});
    }
    res.json({success: true, blog})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}
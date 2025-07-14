import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import { error } from "console";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    // Validate all required fields
    if (!title || !description || !category || !imageFile) {
      return res.json({
        success: false, message: "Missing Required Fields"
      });
    }

    // Read image from disk
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // Optimized URL
    const optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ]
    });
    const image = optimizedImageURL;
    // Create blog
    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished
    });
    res.json({
        success: true, message: "Blog Added Successfully....."
    });

  } catch (err) {
    res.json({
      success: false, message: error.message
    });
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
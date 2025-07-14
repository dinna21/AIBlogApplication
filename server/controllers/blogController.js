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
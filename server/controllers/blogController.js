import fs from "fs/promises";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";

export const addBlog = async (req, res, next) => {
  try {
    // Debugging: Log incoming request details
    console.log('\n=== REQUEST DEBUGGING ===');
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Raw Body:', req.body);
    console.log('Files:', req.file ? 'Present' : 'Missing');

    if (req.file) {
      console.log('File Details:', {
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      });
    }

    // Parse blog data if it's inside req.body.blog
    let blogData = req.body;
    if (req.body.blog) {
      try {
        blogData = JSON.parse(req.body.blog);
        console.log('Parsed blogData:', blogData);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON in 'blog' field",
        });
      }
    }

    // Destructure parsed or direct body
    const {
      title = '<MISSING>',
      subTitle = '<MISSING>',
      description = '<MISSING>',
      category = '<MISSING>',
      isPublished = '<MISSING>'
    } = blogData;

    const imageFile = req.file;

    // Debug the extracted values
    console.log('\nExtracted Values:');
    console.log('Title:', title);
    console.log('SubTitle:', subTitle);
    console.log('Description:', description);
    console.log('Category:', category);
    console.log('isPublished:', isPublished);
    console.log('Image File:', imageFile ? 'Received' : 'Not received');
    console.log('=======================\n');

    // Validate all required fields
    const missingFields = [];
    if (!title || title === '<MISSING>') missingFields.push('title');
    if (!subTitle || subTitle === '<MISSING>') missingFields.push('subTitle');
    if (!description || description === '<MISSING>') missingFields.push('description');
    if (!category || category === '<MISSING>') missingFields.push('category');
    if (!imageFile) missingFields.push('image');

    if (missingFields.length > 0) {
      console.error('Missing fields detected:', missingFields);
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields
      });
    }

    // Read image from disk
    const fileBuffer = await fs.readFile(imageFile.path);
    console.log('File read successfully, size:', fileBuffer.length, 'bytes');

    // Upload to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });
    console.log('ImageKit upload successful:', response.filePath);

    // Clean up temp file
    await fs.unlink(imageFile.path);
    console.log('Temporary file cleaned up');

    // Optimized image URL
    const optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });
    const image = optimizedImageURL;
    // Create blog
    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      isPublished,
    });

    console.log('Blog created successfully:', blog._id);

    return res.status(201).json({
      success: true,
      message: "Blog added successfully",
      blog,
    });

  } catch (err) {
    console.error('\n=== ERROR DETAILS ===');
    console.error('Error:', err);
    console.error('Stack:', err.stack);
    console.error('Request Body:', req.body);
    console.error('Request File:', req.file);
    console.error('====================\n');
    
    return next(err);
  }
};

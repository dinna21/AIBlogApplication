import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import blog from '../models/Blog.js'
export const addBlog = async ()=>{
    try {
        const {title,subtitle,description,category,isPublished} = JSON.parse(req.body,blog);
        const imageFile = req.file;
        // check if all the fields are present 
        if(!title || !description || !category || !imageFile)
        {
            return res.json({success: false, message: "Missing Required Fields"})
        }
    //Now we are going to host boog images in the cloud platform and add the url in the mongodb
    const fileBuffer = fs.readFileSync(imageFile.path);
    const responese = await imagekit.upload({
        //Upload image to imagekit
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: "/blogs"
    })
    //Optimization through iamgekit URL transformation 
    const OptimizationImageURL = imagekit.url({
        path: responese.filePath,
        transformation:[
            {quality: 'auto'},//auto comprssion 
            {format: 'webp'},// convert to modern format 
            {width: '1280'} // width resizing 
        ]
    });
    const image = OptimizationImageURL;

    await blog.create({title, subtitle, description, category, image})
    res.json({success:true, message: "Blog added Successfully"});


    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
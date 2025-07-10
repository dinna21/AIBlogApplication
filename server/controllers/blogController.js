import fs from 'fs';
import imagekit from '../configs/imageKit.js';
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
    } catch (error) {
        
    }
}
import mongoose  from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    subTitle: {type: String},
    description: {type: String, required: true},
    category: {type: String, required: true},
    // in this we added image url that's why image type is string
    image: {type: String, required: true},
    isPublished: {type: Boolean, required: true}
},{timestamps: true})

const Blog = mongoose.model('blog',blogSchema)

export default Blog;
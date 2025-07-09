import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected',()=>console.log("Database IS Connected"))
        await mongoose.connect(`${process.env.MONGO_URI}/AiBlog`)

    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB;
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

await connectDB();
const app = express();

//Midleware 
app.use(cors());
app.use(express.json());
//Routes
app.get('/',(req,res) => res.send("API is Working"));
app.use('/api/admin',adminRouter);
app.use('/api/blog',blogRouter);



const port = process.env.port ||  3000;
app.listen(port,()=>{
    console.log('API is working on port '+port);
})


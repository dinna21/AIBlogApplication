import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';

await connectDB();
const app = express();

//Midleware 
app.use(cors());
app.use(express.json());
//Routes
app.get('/',(req,res) => res.send("API is Working"));
const port = process.env.port ||  3000;
app.listen(port,()=>{
    console.log('API is working on port '+port);
})


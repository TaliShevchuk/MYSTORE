import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import functions from './controllers/functions.js';
dotenv.config();

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api',functions);
mongoose.connect(process.env.MONGO_URL)
.then(results => {
    //console.log(results);
    app.listen(process.env.PORT,() => {
        console.log(`Server is running on port ${process.env.PORT}`);
     })
})
.catch(error => {
    console.log(error);
})


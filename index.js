// ==== ENV package =====//
require('dotenv').config();
//====express required====//
const express = require('express');
const apiRouter = require('./routes/index');
const app = express();
// cors package
const cors =require('cors')
app.use(cors())
// helmet package 
const helmet = require('helmet');
app.use(helmet());
//import mangoose
const mongoose = require('mongoose');
// pars data
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// ==== PORT ====//
const port = process.env.PORT || 1900;

//==== Route ====//
app.use('/api',apiRouter);


// connect to database
mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE_URL}`)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
// Run server 
app.listen(port , (err)=>{
    if(err){
        console.log(err);
    }
    console.log(`run server :: PORT = ${port}`)
})
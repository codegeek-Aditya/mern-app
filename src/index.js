// require('dotenv').config({ path: './env'})

import dotenv from 'dotenv'
import connectDb from './db/index.js'
import { app } from './app.js';

dotenv.config({
    path: './.env'
});

connectDb()
    .then(() => {
        app.on("error", (error) => {
            console.log(`DB CONNECTION ERROR`, error)
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server started on port - ${process.env.PORT}`)
        })
    })
    .catch((error) => console.log(`Mongo DB Connection FAILED - `, error))


































// iife, async await, try catch -- not using because looking too polluted
/*
import mongoose from 'mongoose';
import { DB_NAME } from './constants';
import express from 'express';
const app = express();

// iife
;(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log(`ERROR:`, error)
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port : ${process.env.port}`)
        })

    }
    catch (error) {
        console.error(`Error`, error)
    }
})() 
*/
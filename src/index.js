// require('dotenv').config({ path: './env'})

import dotenv from 'dotenv'
import connectDb from './db/index.js'

dotenv.config({
    path: './env'
});

connectDb();


































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
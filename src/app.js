import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// cors
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// configuration - when data is coming from form
app.use(express.json({
    limit: '20kb'
}))

// configuration - when data is coming from url
app.use(express.urlencoded({
    extended: true,
    limit: '20kb'
}))

// configuration - to keep assets such as images to keep in public folder
app.use(express.static("public"))

// cookie
app.use(cookieParser())


export { app }
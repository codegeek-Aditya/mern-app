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


// routes import
import userRouter from './routes/user.routes.js'

// routes.declaration
// this will be used as prefix now (/users). eg Register route - http://localhost:8000/api/v1/users/register
app.use("/api/v1/users", userRouter)

export { app }
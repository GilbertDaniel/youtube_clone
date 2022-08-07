import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from 'cors'
import authRouters from "./routes/auth.js"
import userRouters from "./routes/users.js"
import videoRouters from "./routes/videos.js"
import commentRouters from "./routes/comments.js"
import cookieParser from "cookie-parser"

const app = express()

dotenv.config()

const connect = () => {
    mongoose.connect(process.env.CONNECTION_URL).then(()=>{
        console.log("Connected to DB")
    }).catch((err)=>{
        throw err;
    })
}

app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use("/api/auth", authRouters)
app.use("/api/users", userRouters)
app.use("/api/videos", videoRouters)
app.use("/api/comments", commentRouters)

//handling error in express server
app.use((error, req, res, next)=>{
    const status = error.status || 500;
    const message = error.message || "Something Went Wrong!"

    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(8800, ()=>{
    connect()
    console.log("Connected to Server!")
})
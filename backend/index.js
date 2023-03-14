import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import UserRouter from './routes/user.js'
const port = 5000
dotenv.config()

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use("/users", UserRouter) //http:localhost:5000/users/singup
app.get("/",(req, res)=>{
    res.send("My express app")
})


mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(port,()=>{
        console.log(`My port is running on port ${port} and connected to mongodb`);
    })
}).catch((err)=>{
    console.log(`${err} db not conncected`);
})


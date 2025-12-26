import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import userRoute from "./routes/userRoute"
import postRoute from "./routes/postRoute"

dotenv.config()

const app=express()
const PORT=process.env.PORT || 5000;
const allowedOrigins=[
    "http://localhost:5173"
]

app.use(cors({
    origin:allowedOrigins
}))
app.use(express.json())
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)

app.get('/',(req,res)=>{
    res.send('Echo Backend is Running!!!')
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})

export default app;
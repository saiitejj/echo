import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import userRoute from "./routes/userRoute"


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

app.get('/',(req,res)=>{
    res.send('Echo Backend is Running!!!')
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
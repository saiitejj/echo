import { Router,Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"
import jwt  from "jsonwebtoken";
const router=Router()
const prisma=new PrismaClient()

interface RegisterBody{
    email: string,
    password: string,
    name?: string;
}


router.post('/register',async (req:Request,res:Response):Promise<any>=>{
    try{
        const {email,password,name}=req.body as RegisterBody
        if(!email||!password){
            return res.status(400).json({error:"Email and Password are required"})

        }
        const existingUser=await prisma.user.findUnique({
            where:{email},
        })

        if(existingUser){
            return res.status(400).json({error:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        
        const newUser=await prisma.user.create({
            data:{
                email,
                password:hashedPassword,
                name,
                createdAt:new Date(),
            }
        })

        return res.status(201).json({
            message:"User registered successfully",
            user:{
                id:newUser.id,
                email:newUser.email,
                name:newUser.name,
            }
        })


    } catch(error){
        console.error("Register Error:",error)
        return res.status(500).json({error:"Something went wrong"})
    }   
})

interface LoginBody{
    email: string;
    password: string;
}
router.post('/login',async(req:Request,res:Response):Promise<any>=>{
    try{

        const {email,password}=req.body as LoginBody
        if(!email || !password){
            return res.status(400).json({error:"Email and Password are required"})
    
        }
        const existingUser=await prisma.user.findUnique({
            where:{
                email
            },
        })
        if(!existingUser){
            return res.status(400).json({error:"Invalid Email or Password"})
        }
        const Match=await bcrypt.compare(password,existingUser.password)
        if(!Match){
            return res.status(400).json({error:"Invalid Email or Password"})
        }

        const token=jwt.sign(
            {id:existingUser.id,email:existingUser.email},
            process.env.JWT_SECRET as string,
            {expiresIn:"1h"}
        )

        return res.status(200).json({
                message:"User Login successfully",
                token,
                user:{
                    id:existingUser.id,
                    email:existingUser.email,
                    name:existingUser.name,
                }
            })
    }catch(error){
        console.error("Login Error",error)
        return res.status(500).json({error:'Something went wrong'})

    }




})


export default router
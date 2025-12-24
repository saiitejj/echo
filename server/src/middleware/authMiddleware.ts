import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"

export interface AuthUser{
    id:number,
    email:string;
}

export interface AuthRequest extends Request{
    user?: AuthUser;
}

export const authenticateToken=(
    req:AuthRequest,
    res:Response,
    next:NextFunction
): any =>{
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({error:"Access denied. No token provided."})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET as string)
        req.user=decoded as AuthUser
        next()
    } catch(error){
        return res.status(403).json({error:"Invalid or expired token."})
    }
}
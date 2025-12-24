import { Router,Response } from "express";
import { PrismaClient} from "@prisma/client";
import { authenticateToken,AuthRequest } from "../middleware/authMiddleware";


const router=Router()
const prisma=new PrismaClient()

interface CreatePostBody{
    title:string,
    content:string;
    published?:boolean;
}


router.post('/',authenticateToken,async(req:AuthRequest,res:Response):Promise<any>=>{
    try{
            const {title,content,published}=req.body as CreatePostBody
            const userId=req.user?.id;

            if(!userId){
                return res.status(401).json({error:"User ID missing"})
            }

            if(!title || !content){
                return res.status(401).json({error:"Title and content are required"})
            }

            const newPost=await prisma.post.create({
                data:{
                    title,
                    content,
                    authorId: userId,
                    createdAt: new Date(),
                    published
                },
            })
            return res.status(201).json(newPost)

    }catch(error){
        console.error("Error !!",error)
        return res.status(500).json({error:"Error while creating post."})
    }
})
router.get('/',async (req:AuthRequest,res:Response):Promise<any>=>{
    try{
        const posts=await prisma.post.findMany({
            include:{
                author:{
                    select:{name:true,email:true}
                }
            },
            orderBy:{
                createdAt:'desc'
            }
        })
        return res.status(200).json(posts)
    }catch(error){
        console.error("Error fetching posts:",error)
        return res.status(500).json({error:"Error fetching posts"})
    }
})

router.get('/my-posts',authenticateToken,async(req:AuthRequest,res:Response):Promise<any>=>{
    try{
        const userId=req.user?.id
        const myPosts=await prisma.post.findMany({
            where:{
                authorId:userId
            },
            include:{
                author:{
                    select:{name:true,email:true}
                }
            },
            orderBy:{
                createdAt:'desc'
            }
        })
        return res.status(200).json(myPosts)
    }catch(error){
        console.error("Error fetching my posts:",error)
        return res.status(500).json({error:"Error fetching my posts"})
    }
})

router.get("/:id",async(req:AuthRequest,res:Response):Promise<any>=>{
    try{
        const {id}=req.params
        const postId=Number(id)
        if(Number.isNaN(postId)){
            return res.status(400).json({error:"Invalid ID format"})
        }
        const post=await prisma.post.findUnique({
            where:{
                id:postId
            },
            include:{
                author:{
                    select:{name:true,email:true}
                }
            }
        })
        if (!post){
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json(post);

    }catch (error) {
        console.error("Error fetching single post:", error);
        return res.status(500).json({ error: "Error fetching post" });
    }
})
router.put("/:id",authenticateToken,async(req:AuthRequest,res:Response):Promise<any>=>{
    try{
        const {id}=req.params
        const {title,content,published}=req.body as CreatePostBody
        const postId=Number(id)
        const userId=req.user?.id
        if(Number.isNaN(postId)){
            return res.status(400).json({error:"Invalid ID"})
        }
        const existingPost=await prisma.post.findUnique({
            where:{
                id:postId
            }
        })
        if (!existingPost) return res.status(404).json({error:"Post not found"})

        if(existingPost.authorId!==userId){
            return res.status(403).json({error:"You are not authorized to edit this post"})
        }

        const updatePost=await prisma.post.update({
            where:{
                id:postId
            },
            data:{
                title,
                content,
                published
            }
        })
        return res.status(200).json(updatePost)
    }catch(error){
        console.error("Error updating post:", error);
        return res.status(500).json({ error: "Error updating post" });
    }
})

router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const postId = Number(id);
        const userId = req.user?.id;

        if (Number.isNaN(postId)) return res.status(400).json({ error: "Invalid ID" });

        const existingPost = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!existingPost) return res.status(404).json({ error: "Post not found" });

        if (existingPost.authorId !== userId) {
            return res.status(403).json({ error: "You are not authorized to delete this post" });
        }

        await prisma.post.delete({
            where: { id: postId }
        });

        return res.status(200).json({ message: "Post deleted successfully" });

    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({ error: "Error deleting post" });
    }
});

export default router
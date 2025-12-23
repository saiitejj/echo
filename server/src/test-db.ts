import {PrismaClient} from '@prisma/client'
// import * as dotenv from 'dotenv'

// dotenv.config()
const prisma=new PrismaClient()
//     datasourceUrl:process.env.DATABASE_URl,
        
// })

async function main() {
    console.log("Creating a user....")
    const newUser=await prisma.user.create({
        data:{
            email:"echo_tester1@example.com",
            password:"securepass123",
            name:"Beta Tester",
            createdAt:new Date(),
        }
    })
    console.log("User created:",newUser.id)
    
    const newPost=await prisma.post.create({
        data:{
            title:"Demo Title2",
            content:"Testing........",
            published:true,
            createdAt:new Date(),
            authorId:newUser.id
        }
    })
    console.log("User created:",newPost.id)

    const userWithPosts=await prisma.user.findUnique({
        where:{
            email:"echo_tester@example.com"
        },
        include:{
            posts:true
        }
    })
    console.log("🔍 Result from Database:")
  console.dir(userWithPosts, { depth: null })
    
}
main()
    .catch(e=>console.error(e))
    .finally(async()=>await prisma.$disconnect())